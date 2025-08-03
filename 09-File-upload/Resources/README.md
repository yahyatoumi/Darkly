# File Upload Vulnerability - Unrestricted File Upload

## What I Found
The website's file upload functionality can be bypassed to upload malicious PHP files, allowing code execution on the server. The application only validates file extensions client-side.

## How I Exploited It

### Step 1: Normal Upload Test
I first tested uploading a legitimate `.jpg` image file to understand the upload functionality. This worked as expected.

### Step 2: Identifying the Weakness
The application appeared to only allow `.jpg` files, but I suspected this validation was insufficient.

### Step 3: Bypassing the Filter
I intercepted the upload request and modified the filename from `image.jpg` to `anything.php` while keeping the file content intact.

### Step 4: Successful Upload
The server accepted the PHP file, indicating weak server-side validation.

### Step 5: Getting the Flag
By accessing the uploaded PHP file through the browser, I was able to trigger code execution and retrieve the flag.

## Why This is Critical

**Remote Code Execution (RCE):**
- Attackers can upload and execute malicious scripts
- Complete server compromise is possible
- Can install backdoors for persistent access

**Common Attack Scenarios:**
- Upload PHP web shells for remote command execution  
- Install malware or crypto miners
- Access sensitive files and databases

## How the Attack Works

**Typical vulnerable code:**
```php
// BAD - Only checks client-provided filename
if (pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION) == 'jpg') {
    move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
}
```

## Prevention Methods

### 1. Proper File Validation
```php
// Validate MIME type
$allowed_types = ['image/jpeg', 'image/png'];
if (!in_array($_FILES['file']['type'], $allowed_types)) {
    die('Invalid file type');
}

// Validate file content (magic bytes)
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $_FILES['file']['tmp_name']);
if (!in_array($mime, $allowed_types)) {
    die('Invalid file content');
}
```

### 2. Secure File Storage
```php
// Generate random filename
$extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
$filename = bin2hex(random_bytes(16)) . '.' . $extension;

// Store outside web root
$upload_dir = '/var/uploads/'; // Not accessible via web
move_uploaded_file($_FILES['file']['tmp_name'], $upload_dir . $filename);
```

### 3. File Size Limits
```php
// Check file size (2MB limit)
if ($_FILES['file']['size'] > 2 * 1024 * 1024) {
    die('File too large');
}
```

### 4. Web Server Configuration
```apache
# Apache - Prevent execution in upload directory
<Directory "/var/www/html/uploads">
    Options -ExecCGI
    AddHandler cgi-script .php .py .jsp .asp .sh .cgi
</Directory>
```

```nginx
# Nginx - Block script execution
location /uploads {
    location ~ \.php$ {
        deny all;
    }
}
```

## Additional Security Measures

### File Content Scanning
- Use antivirus scanning on uploaded files
- Implement image reprocessing to strip metadata
- Use sandboxed environments for file processing

### Access Controls
- Authenticate users before allowing uploads
- Implement rate limiting on uploads
- Log all upload activities

### Monitoring
Watch for:
- Uploads with executable extensions
- Files with suspicious content patterns
- Multiple upload attempts from same IP

## Detection Indicators

**Suspicious uploads:**
- Double extensions (image.jpg.php)
- Case variation (file.PHP, file.pHp)
- Special characters in filenames

## Key Lessons

1. **Never trust client-side validation** - Always validate on the server
2. **Validate file content, not just names** - Check MIME types and magic bytes
3. **Store uploads securely** - Outside web root or with execution disabled
4. **Use random filenames** - Prevent direct access and execution
5. **Implement layered security** - Multiple validation checks and restrictions

This vulnerability represents one of the most dangerous web application flaws, as it can lead to complete server compromise.