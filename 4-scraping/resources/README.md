# Web Scraping Vulnerability - Hidden Directory Exposure

## What I Found
The website has a hidden directory structure containing thousands of files that can be scraped automatically. This exposes sensitive information and creates performance risks.

## How I Discovered It

### Initial Discovery
While using directory enumeration tools (dirb), I found a `.hidden` folder containing a massive nested directory structure with approximately 20,000 README files.

### Manual Exploration Attempt
I first tried navigating the folders manually, but quickly realized this was impossible due to the sheer number of files and folders.

### Automated Solution
I created a web scraping script using:
- **axios** - for HTTP requests
- **cheerio** - for HTML parsing  
- **pLimit** - to control request rate and avoid overwhelming the server

### Success
The script successfully scraped all directories and found the flag in:
```
http://{IP}/.hidden/whtccjokayshttvxycsvykxcfm/igeemtxnvexvxezqwntmzjltkt/lmpanswobhwcozdqixbowvbrhw/README
```

## Why This is a Problem

**Information Exposure:**
- Sensitive files can be discovered and downloaded
- Hidden content becomes accessible to attackers
- Directory structure reveals application architecture

**Performance Impact:**
- Scrapers can send hundreds of requests per second
- High CPU and database load
- Potential server crashes from resource exhaustion

**SEO Issues:**
- Search engines may penalize sites with duplicate scraped content
- Can affect legitimate website rankings

## How to Prevent Web Scraping

### Rate Limiting
```nginx
# nginx example
limit_req_zone $binary_remote_addr zone=scraping:10m rate=10r/m;
limit_req zone=scraping burst=5;
```

### Authentication
- Require login for sensitive directories
- Use proper access controls on hidden folders

### Bot Detection
- Monitor for unusual request patterns
- Implement CAPTCHA for suspicious behavior
- Use honeypot traps (invisible links that only bots would follow)

### Content Protection
- Load sensitive data dynamically with JavaScript
- Implement proper directory permissions

## Simple Fixes

1. **Implement Rate Limiting**: Prevent rapid automated requests
2. **Monitor Traffic**: Watch for scraping patterns
3. **Use Authentication**: Protect sensitive content properly

## Key Lesson
Hidden directories aren't actually hidden from determined attackers. Use proper access controls instead of relying on obscure folder names.