# Brute Force Attack Breach Report

## What I Found

This breach is a brute force breach. I found that it is possible to brute force your way to login.

## How I Did It

1. I created a script to try logging in with pre-guessed usernames and passwords
2. Since we were already able to navigate the database due to the SQL injection vulnerability, we already know that there are two users with usernames ["root", "admin", "me"]
3. By doing that, I was able to brute force my way to send login requests with different usernames and passwords
4. I was eventually able to find the flag by logging in with `me` as username and `shadow` as password

## Why This is a Very Big Breach

This breach is very serious because it can give the attacker the user credentials so they can log in as the user that they found the username and password that belongs to them.

## Why This Breach Happens

1. The users use well-known and widely used passwords
2. The developer made it possible for the attacker to spam and brute force their way through testing a lot of usernames and passwords

## How to Prevent This

1. The users shouldn't be setting easy to guess and widely used passwords
2. We shouldn't make the users able to set their passwords to easy and widely used passwords
3. We should implement "account lockout policy" so the user can't attempt to login a lot of times for a certain time
4. We should consider blocking for some time IP addresses if they attempted a lot of requests to the server
5. We should keep track of users that try attempting to do these kinds of attacks to take actions against them