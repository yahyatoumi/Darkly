# Stored XSS Attack via Feedback Form

## What I Found
The feedback form is vulnerable to stored XSS (Cross-Site Scripting). I can inject malicious JavaScript that gets saved to the database and executes when other users view the feedback.

## How I Exploited It

### Step 1: Testing for XSS
I submitted this payload in the feedback form:
```html
<img src=x onerror=alert(1337) />
```

### Step 2: Confirming the Vulnerability
When the feedback page loaded, the JavaScript executed and showed an alert box. This proves the application doesn't sanitize user input.

### Step 3: Getting the Flag
For this specific challenge, I used:
- **Name**: "anything" 
- **Message**: "script"

This gave me the flag: `0fbb54bbf7d099713ca4be297e1bc7da0173d8b3c21c1811b916a3a86652724e`

## Why This is Dangerous

**Stored XSS is worse than reflected XSS because:**
- The malicious code is permanently stored on the server
- It affects every user who views the infected page
- Attackers don't need to trick users into clicking malicious links

**What attackers can do:**
- Steal user sessions and cookies
- Perform actions as the victim user
- Redirect users to malicious websites
- Steal sensitive information from the page

## How to Fix It

### 1. Sanitize Input
Remove dangerous HTML/JavaScript before saving to database:
```php
// PHP example
$clean_input = htmlspecialchars($user_input, ENT_QUOTES, 'UTF-8');
```

### 2. Encode Output
Escape data when displaying it:
```javascript
// Safe
element.textContent = userContent;

// Dangerous
element.innerHTML = userContent;
```

### 3. Use Content Security Policy
Add this HTTP header:
```
Content-Security-Policy: default-src 'self'; script-src 'self'
```

### 4. Framework Protections
Most modern frameworks protect against XSS by default - don't disable these protections.

## Key Lesson
Never trust user input. Always sanitize data going into your database and escape data coming out to the browser.