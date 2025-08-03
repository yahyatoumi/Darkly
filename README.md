# Darkly - 42 School Web Security Project

## Project Overview
Darkly is a web security penetration testing project from 42 School designed to teach fundamental web application vulnerabilities and security concepts. The goal is to discover and exploit various security flaws in a deliberately vulnerable web application to capture flags and learn defensive programming practices.

## Educational Objectives
- Understanding common web application vulnerabilities
- Learning penetration testing methodologies
- Practicing secure coding principles
- Developing security awareness for web development
- Hands-on experience with security tools and techniques

## Vulnerabilities Discovered

### 1. SQL Injection - Members Search
**Type**: Database Manipulation  
**Impact**: Critical - Complete database compromise  
**Method**: Bypassed input validation using `1 or 1=1` and UNION attacks  
**Key Learning**: Never trust user input in SQL queries - use prepared statements

### 2. SQL Injection - Images Search
**Type**: Database Manipulation  
**Impact**: Critical - Database compromise through image search  
**Method**: Similar to members search but targeting image metadata  
**Key Learning**: All database queries need parameterization

### 3. Stored XSS - Feedback Form
**Type**: Cross-Site Scripting  
**Impact**: High - Session hijacking and user impersonation
**Key Learning**: Always sanitize user input and encode output

### 4. Web Scraping Vulnerability
**Type**: Information Disclosure  
**Impact**: Medium - Data extraction and server overload  
**Method**: Automated scraping of ~20,000 hidden README files  
**Key Learning**: Implement rate limiting and proper access controls

### 5. Brute Force - Login
**Type**: Authentication Bypass  
**Impact**: High - Account takeover through login form  
**Method**: Automated login attempts with common passwords  
**Key Learning**: Implement account lockouts and strong password policies

### 6. Brute Force Attack
**Type**: Authentication Bypass  
**Impact**: High - Directory/admin access  
**Method**: Additional brute force vector for protected areas  
**Key Learning**: Multiple entry points need protection

### 7. Admin Token Encryption
**Type**: Cryptographic Weakness  
**Impact**: Critical - Admin privilege escalation  
**Method**: Modified client-side admin cookie from MD5("false") to MD5("true")  
**Key Learning**: Never trust client-side data for security decisions

### 8. Path Traversal
**Type**: File System Access  
**Impact**: High - Sensitive file disclosure
**Key Learning**: Validate and restrict file path inputs

### 9. File Upload Vulnerability
**Type**: Remote Code Execution  
**Impact**: Critical - Complete server compromise  
**Method**: Bypassed file type validation to upload PHP scripts  
**Key Learning**: Implement proper file validation and secure storage

### 10. Password Recovery Bypass
**Type**: Authentication Bypass  
**Impact**: High - Password reset for any user
**Key Learning**: Client-side security is not security

### 11. Open Redirect
**Type**: Social Engineering / Phishing  
**Impact**: Medium - User redirection to malicious sites  
**Method**: Manipulated redirect parameters to external domains  
**Key Learning**: Validate redirect destinations and use whitelist

### 12. Survey Select Manipulation
**Type**: Input Validation Bypass  
**Impact**: Medium - Logic bypass through form manipulation  
**Method**: Modified survey selection values to bypass intended logic  
**Key Learning**: Server-side validation is essential

### 13. HTTP Header Access Control Bypass
**Type**: Authorization Bypass  
**Impact**: High - Access control circumvention  
**Method**: Manipulated HTTP headers to bypass access restrictions  
**Key Learning**: Don't rely on HTTP headers for security decisions

### 14. Multi-media XSS
**Type**: Cross-Site Scripting  
**Impact**: High - XSS through media files  
**Method**: Embedded malicious scripts in media file metadata  
**Key Learning**: Sanitize all user content including file uploads

## Tools and Techniques Used

### Reconnaissance Tools
- **DirBuster**: Directory and file enumeration
- **dirb**: Web content scanner
- **Browser Developer Tools**: HTML/JavaScript inspection

### Exploitation Tools
- **Custom Scripts**: Automated attacks (brute force, scraping)
- **Browser Extensions**: Cookie manipulation

### Cryptographic Tools
- **Online Hash Crackers**: MD5 rainbow table lookups
- **hashcat**: Command-line password recovery
- **Command-line utilities**: SHA-256 generation

### Programming Libraries
- **axios**: HTTP request handling
- **cheerio**: HTML parsing
- **pLimit**: Rate limiting for scraping

## Vulnerability Impact Summary

| Vulnerability | Risk Level | Impact Type |
|---------------|------------|-------------|
| SQL Injection (Members) | 🔴 Critical | Database compromise |
| SQL Injection (Images) | 🔴 Critical | Database compromise |
| File Upload RCE | 🔴 Critical | Server takeover |
| Admin Token Encryption | 🔴 Critical | Admin access |
| Stored XSS (Feedback) | 🟡 High | User impersonation |
| Multi-media XSS | 🟡 High | Media-based XSS |
| Brute Force (Login) | 🟡 High | Account takeover |
| Brute Force Attack | 🟡 High | System access |
| Path Traversal | 🟡 High | File disclosure |
| Password Recovery Bypass | 🟡 High | Password reset bypass |
| HTTP Header Bypass | 🟡 High | Access control bypass |
| Web Scraping | 🟠 Medium | Data extraction |
| Open Redirect | 🟠 Medium | Phishing attacks |
| Survey Select Manipulation | 🟠 Medium | Logic bypass |

## Key Security Principles Learned

### Input Validation
- **Never trust user input** - Validate and sanitize all data
- **Use whitelisting** - Only allow known good input
- **Escape output** - Prevent script injection

### Authentication & Authorization
- **Server-side validation** - Don't rely on client-side security
- **Strong password policies** - Prevent common passwords
- **Account lockouts** - Limit failed login attempts
- **Session management** - Use secure, server-side sessions

### File Security
- **Secure file uploads** - Validate content, not just names
- **Proper permissions** - Restrict access to sensitive files
- **Path validation** - Prevent directory traversal

### Cryptography
- **Use strong algorithms** - Avoid MD5, use SHA-256 or better
- **Proper hashing** - Use salt and appropriate algorithms for passwords
- **Secure tokens** - Generate cryptographically secure random values

### Defense in Depth
- **Multiple security layers** - Don't rely on single protections
- **Rate limiting** - Prevent automated attacks
- **Monitoring** - Log and alert on suspicious activity
- **Regular updates** - Keep software and dependencies current

## Prevention Best Practices

### For Developers
1. **Use security frameworks** - Leverage built-in protections
2. **Regular security testing** - Automated and manual testing
3. **Code reviews** - Focus on security considerations
4. **Security training** - Stay updated on common vulnerabilities
5. **Principle of least privilege** - Minimize access and permissions

### For System Administrators
1. **Web server hardening** - Secure configurations
2. **File permissions** - Proper access controls
3. **Network segmentation** - Isolate critical systems
4. **Monitoring and logging** - Detect attacks early

## Tools for Prevention

### Development
- **Static analysis tools** (SonarQube, ESLint)
- **Dependency scanners** (npm audit, OWASP Dependency Check)
- **Security linters** (bandit for Python, brakeman for Ruby)

### Testing
- **OWASP ZAP** - Automated security testing
- **Burp Suite** - Manual penetration testing
- **Nmap** - Network and service discovery

### Monitoring
- **Web Application Firewalls** (ModSecurity, Cloudflare)
- **Intrusion Detection Systems** (Snort, Suricata)
- **Log analysis tools** (ELK Stack, Splunk)

## Project Structure
```
darkly/
├── 01-Sql-Injection-In-Members-Search/
│   └── README.md
├── 02-Sql-Injection-in-Images-Search/
│   └── README.md
├── 03-XSS-In-Feedback-Form/
│   └── README.md
├── 04-Scraping/
│   └── README.md
├── 05-Brute-Force-Login/
│   └── README.md
├── 06-Brute-Force/
│   └── README.md
├── 07-Admin-Token-encryption/
│   └── README.md
├── 08-Path-Traversal/
│   └── README.md
├── 09-File-upload/
│   └── README.md
├── 10-Recover-Password/
│   └── README.md
├── 11-Redirect/
│   └── README.md
├── 12-Servey-Select/
│   └── README.md
├── 13-HTTP-Header-Based-Access-Control-Bypass/
│   └── README.md
├── 14-Multi-Media-XSS/
│   └── README.md
└── README.md (this file)
```

## References and Further Learning

### OWASP Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)

### Security Learning Platforms
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackTheBox](https://www.hackthebox.com/)
- [TryHackMe](https://tryhackme.com/)
- [DVWA (Damn Vulnerable Web Application)](https://dvwa.co.uk/)

## Conclusion

The Darkly project provides hands-on experience with the most common web application vulnerabilities. Each discovered flaw represents a real-world security issue that developers encounter daily. The key takeaway is that security must be built into applications from the ground up, not added as an afterthought.

**Remember**: The goal isn't just to find vulnerabilities, but to understand how to prevent them in real applications. Every exploit discovered here represents a lesson in secure development practices.

---
*This project is for educational purposes only. Never attempt to exploit vulnerabilities on systems you don't own or lack explicit permission to test.*