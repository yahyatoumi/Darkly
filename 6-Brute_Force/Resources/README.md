# Directory Traversal and Exposed Credentials Breach Report

## What I Found

By using brute force tools such as DirBuster, I was able to find out that the server can serve files such as:
- `/admin` 
- `/whatever/htpasswd`

## The Exposed File

The `/whatever/htpasswd` file includes: `root:437394baff5aa33daa618be47b75cb49`

After searching online, I found out that the hash is an encrypted password for `qwerty123@`

## How I Got Access

1. I reached the `/admin` page which has a login form
2. I entered `root` as username and `qwerty123@` as password 
3. This gave me authentication and access

## What is .htpasswd File

After doing some research, I found out that `/whatever/htpasswd` is a reference to a `.htpasswd` file. It's a file used in Apache web server to store authentication credentials. The credentials are stored in "username:password" format where the password is the hashed version of the real password.

## Why This Breach Happened

This breach mainly happens because the developer did not secure access to the file.

## Best Practices That Were Not Followed

The developer who sets up Apache, Nginx, or whatever web server should make sure that:

1. Users can't access sensitive directories and files (like the `/whatever` folder in this case)
2. Users can't access files like `.env` files 
3. The server should not allow IP addresses to spam a lot of requests in a short time

## What Should Be Fixed

- Block access to sensitive directories and files
- Use proper server configuration to hide system files
- Implement rate limiting to prevent brute force attacks