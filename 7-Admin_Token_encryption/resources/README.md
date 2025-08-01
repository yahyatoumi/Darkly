# Security Breach Report

## What I Found

This breach happened because of a badly secured cookie called "I_am_admin" that the website uses to check if a user is an admin or not.

## The Problem

The website backend uses a simple and easy to find algorithm called "MD5" to hash the cookie. This is a big problem because MD5 is not secure.

## How I Found the Flag

1. I copied the token from the cookie
2. I pasted the token in a search engine 
3. I got a result showing that the token is the MD5 hash of the word "false"
4. I then hashed the word "true" using MD5
5. I replaced the old cookie value with the new token I got
6. I got the flag

## Why This is a Big Problem

This is a serious vulnerability because deciding whether a user is an admin or not should not rely on the client side at all. Instead, this should be done on the backend. Based on whether a user is admin or not, they should have access to different data and UI on the browser.

## What Should Be Fixed

The website should not trust anything that comes from the client side for important security decisions like admin access.