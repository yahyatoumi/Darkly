const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const pLimit = require('p-limit');

// === CONFIGURATION ===
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node scraper.js <ip_address>');
  process.exit(1);
}
const BASE_URL = `http://${args[0]}/.hidden/`;
const DOWNLOAD_DIR = path.resolve(__dirname, 'downloads');
const MAX_DEPTH = 50;
const CONCURRENCY = 10;

// === STATE ===
const visited = new Set();
const readmeUrls = [];
let flagFound = false;

// Ensure downloads dir exists
fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

// Normalize a URL
function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = '';
    u.search = '';
    let normalized = u.href.replace(/\/+$/, '');
    if (!path.extname(u.pathname)) normalized += '/';
    return normalized;
  } catch {
    return url;
  }
}

// Crawl Apache-style directory
async function crawl(url, depth = 0) {
  if (flagFound || depth > MAX_DEPTH) return;

  const normalized = normalizeUrl(url);
  if (visited.has(normalized)) return;
  visited.add(normalized);

  console.log(`🔍 Visiting: ${normalized} (depth ${depth})`);

  try {
    const res = await axios.get(normalized, { timeout: 8000 });
    const $ = cheerio.load(res.data);

    const links = Array.from($('pre a'))
      .filter(a => $(a).text().trim() !== '../')
      .map(a => {
        const name = $(a).text().trim();
        const href = new URL($(a).attr('href'), normalized).href;
        const isDir = href.endsWith('/');
        return { name, href, isDir };
      });

    for (const link of links) {
      if (flagFound) return;

      if (/readme/i.test(link.name) && !link.isDir) {
        readmeUrls.push(link.href);
        console.log(`📝 Found README: ${link.href}`);
      } else if (link.isDir) {
        await crawl(link.href, depth + 1);
      }
    }
  } catch (err) {
    console.warn(`⚠️ Failed to fetch ${url}: ${err.message}`);
  }
}

// Download a README and check for flag
async function downloadAndCheck(url) {
  if (flagFound) return;

  try {
    const res = await axios.get(url, { timeout: 8000 });
    const text = res.data;

    const relPath = new URL(url).pathname.replace(new URL(BASE_URL).pathname, '');
    const filePath = path.join(DOWNLOAD_DIR, relPath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, text, 'utf8');

    if (/flag/i.test(text)) {
      flagFound = true;
      console.log(`\n🚩 FLAG FOUND! URL: ${url}`);
      console.log(`${'='.repeat(80)}\n${text}\n${'='.repeat(80)}`);
    } else {
      console.log(`✅ Saved: ${url}`);
    }
  } catch (err) {
    console.warn(`❌ Failed to download ${url}: ${err.message}`);
  }
}

// Main function
(async () => {
  console.log('🚀 Starting crawl...\n');
  console.log(`🌐 Target URL: ${BASE_URL}`);
  await crawl(BASE_URL);

  console.log(`\n📊 Total README files found: ${readmeUrls.length}`);
  if (readmeUrls.length === 0) return;

  console.log('\n🚀 Starting downloads...\n');

  const limit = pLimit(CONCURRENCY);
  await Promise.all(readmeUrls.map(url => limit(() => downloadAndCheck(url))));

  console.log('\n✅ Done!');
  console.log(`📁 Files saved to: ${DOWNLOAD_DIR}`);
})();