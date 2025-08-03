# Directory Traversal and Exposed Credentials

## What I Found
Using directory enumeration tools, I discovered exposed sensitive files that contained authentication credentials, allowing me to gain admin access to the system.

## How I Discovered It

### Step 1: Directory Enumeration
I used DirBuster to scan for hidden directories and files, which revealed:
- `/admin` - Admin login page
- `/whatever/htpasswd` - Exposed password file

### Step 2: Analyzing the Exposed File
The `/whatever/htpasswd` file contained:
```
root:437394baff5aa33daa618be47b75cb49
```

### Step 3: Cracking the Hash
I identified this as an MD5 hash and cracked it online:
- **Hash**: `437394baff5aa33daa618be47b75cb49`
- **Password**: `qwerty123@`

### Step 4: Gaining Access
I used the discovered credentials on the `/admin` page:
- **Username**: `root`
- **Password**: `qwerty123@`

This gave me full admin access to the system.

## What is .htpasswd?
The `.htpasswd` file is used by Apache web servers to store user authentication data. It contains:
- Usernames and hashed passwords
- Should never be accessible to web users

## Why This is Critical

**Complete System Compromise:**
- Admin credentials provide full system access
- Can modify, delete, or steal any data
- May allow installation of backdoors

## How to Prevent This

### 1. Secure File Permissions
```apache
# Apache configuration
<Files ".htpasswd">
    Require all denied
</Files>

# Block access to sensitive files
<FilesMatch "(\.htpasswd|\.htaccess|\.env)$">
    Require all denied
</FilesMatch>
```

### 2. Proper Directory Structure
- Keep sensitive files outside the web root
- Never store credentials in publicly accessible directories

### 3. Web Server Configuration
```nginx
# Nginx example
location ~ /\.ht {
    deny all;
}

location ~ /\. {
    deny all;
}
```

### 4. Additional Security
- Use strong, unique passwords
- Implement proper access controls
- Monitor for unauthorized file access

## Detection and Monitoring
Watch for:
- Automated directory scanning attempts
- Access to sensitive file extensions (.htpasswd, .env, .config)
- Multiple failed authentication attempts
- Unusual admin login patterns

## Key Lessons
1. **Never expose system files** - Configuration files should not be web-accessible
2. **Use proper file permissions** - Restrict access to sensitive files
3. **Regular security scans** - Check what files are publicly accessible
4. **Strong passwords** - Even if exposed, they should be hard to crack