# Brute Force Attack - Login Vulnerability

## What I Found
The login system has no protection against brute force attacks. I was able to automatically try many username/password combinations until I found valid credentials.

## How I Exploited It

### Step 1: Gathering Usernames
From the previous SQL injection vulnerability, I already knew these usernames existed:
- root
- admin  
- me

### Step 2: Creating a Brute Force Script
I wrote a script that automatically tries different password combinations for each username.

### Step 3: Testing Common Passwords
The script tested common passwords like:
- password
- 123456
- admin
- shadow
- root

### Step 4: Success
I successfully logged in with:
- **Username**: `me`
- **Password**: `shadow`

This gave me access to the user account and the flag.

## Why This is Dangerous

**Account Takeover:**
- Attackers can gain full access to user accounts
- Can steal personal information and sensitive data
- May perform actions as the compromised user

**System Access:**
- If admin accounts are compromised, attackers get full system control
- Can lead to complete data breaches
- May allow attackers to install malware or backdoors

## How to Prevent Brute Force Attacks

### 1. Account Lockout Policy
Lock accounts after failed login attempts:
```
After 5 failed attempts: Lock account for 15 minutes
After 10 failed attempts: Lock account for 1 hour
```

### 2. Rate Limiting
Limit login attempts per IP address:
```
Maximum 10 login attempts per minute per IP
```

### 3. Strong Password Policy
Require users to create secure passwords:
- Minimum 8 characters
- Mix of uppercase, lowercase, numbers, symbols
- No common dictionary words
- No personal information

### 4. Two-Factor Authentication (2FA)
Add an extra security layer even if passwords are compromised.

### 5. CAPTCHA
Show CAPTCHA after several failed attempts to block automated scripts.

### 6. Monitor and Alert
- Log all failed login attempts
- Alert administrators about suspicious activity

## Detection Signs
Watch for these patterns:
- Many failed logins from the same IP
- Login attempts using common usernames (admin, root, test)
- Rapid succession of login attempts
- Attempts outside normal business hours

## Key Lessons
1. **Never rely on weak passwords** - even "hidden" accounts need strong passwords
2. **Implement account lockouts** - prevent unlimited login attempts
3. **Monitor login activity** - detect attacks early
4. **Use multi-factor authentication** - passwords alone aren't enough