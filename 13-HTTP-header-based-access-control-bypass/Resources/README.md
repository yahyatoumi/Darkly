# Header Spoofing Vulnerability Report

## What I Found

This vulnerability is trusting and relying on the request headers on the backend.

## How I Found It

By navigating to:
`http://{ip}/?page=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f`

And inspecting and going through the HTML page source code, I was able to find a comment that says:

```
"You must come from : "https://www.nsa.gov/"."
```

And:

```
"Let's use this browser : "ft_bornToSec". It will help you a lot."
```

This obviously tells us to change the referer and the user-agent headers.

## How I Got the Flag

By doing:
```bash
curl -H "Referer: https://www.nsa.gov/" -H "User-Agent: ft_bornToSec" http://10.13.100.232/\?page\=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f | grep flag
```

I was able to retrieve the flag.

## Why This is a Problem

The problem here is the server may be relying on the headers to give access or do something with that.

This is a problem because the server should not rely on headers to perform such things, because they can be simply modified and making requests with different header values is very easy.

## Key Lesson

Never trust HTTP headers for security decisions - they can be easily spoofed by attackers.