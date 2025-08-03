# Insecure Cookie Authentication - Client-Side Admin Check

## What I Found
The website uses a client-side cookie called "I_am_admin" to determine admin privileges. This cookie uses weak MD5 hashing and can be easily manipulated to gain unauthorized admin access.

## How I Exploited It

### Step 1: Inspecting the Cookie
I found a cookie named `I_am_admin` with the value:
```
I_am_admin=a87ff679a2f3e71d9181a67b7542122c
```

### Step 2: Identifying the Hash
The 32-character value looked like an MD5 hash, so I searched for it online.

### Step 3: Cracking the Hash
The hash `a87ff679a2f3e71d9181a67b7542122c` was the MD5 of the word "false".

### Step 4: Creating Admin Token
I generated the MD5 hash of "true":
```
MD5("true") = b326b5062b2f0e69046810717534cb09
```

### Step 5: Cookie Manipulation
I replaced the cookie value:
- **Original**: `I_am_admin=a87ff679a2f3e71d9181a67b7542122c` (false)
- **Modified**: `I_am_admin=b326b5062b2f0e69046810717534cb09` (true)

### Step 6: Success
After refreshing the page with the modified cookie, I gained admin access and found the flag.

## Why This is Critical

**Complete Access Control Bypass:**
- Anyone can become admin by modifying their cookie
- No server-side validation of user privileges
- Exposes all admin functionality to attackers

**Fundamental Security Flaw:**
- Never trust client-side data for security decisions
- Authentication should always be server-side
- Cookies can be easily modified by users

## The Problems

### 1. Client-Side Authorization
The biggest issue is trusting the client to determine admin status. This is like giving someone a badge and trusting them not to make a fake one.

### 2. Weak Hashing
MD5 is cryptographically broken and easily reversible for simple values like "true" and "false".

### 3. Predictable Values
Using simple boolean values makes it trivial to guess the alternative hash.

## How to Fix This

### 1. Server-Side Session Management
```python
# Good approach - server stores session data
def check_admin(session_id):
    session = get_session_from_database(session_id)
    return session.user.is_admin

# Bad approach - trusting client cookie
def check_admin(cookie_value):
    return cookie_value == "admin_hash"
```

### 2. Secure Session Tokens
- Use cryptographically secure random tokens
- Store user privileges on the server
- Validate tokens against server-side session data

### 3. Proper Cookie Security
```javascript
// Secure cookie settings
Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Strict
```

### 4. Never Trust Client Data
All authorization decisions must happen on the server based on:
- Server-side user database
- Validated session tokens
- Proper authentication flow

## Prevention Checklist

- ✅ **Server-side authorization**: Check permissions on the server
- ✅ **Secure session management**: Use proper session tokens
- ✅ **HttpOnly cookies**: Prevent JavaScript access to sensitive cookies
- ✅ **Input validation**: Never trust client-provided data
- ✅ **Strong cryptography**: Use secure hashing algorithms

This vulnerability represents a fundamental misunderstanding of web security principles and could lead to complete system compromise.