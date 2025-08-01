# Web Scraping Vulnerability Breach Report

## What I Found

This vulnerability is that anybody can scrape the website for data.

## How I Found It

In a previous vulnerability, I had to use dirb to navigate the server's different directories and files. There was a folder named `.hidden`, it has a lot of folders nested inside of it and inside every folder there are subfolders and readme files.

First, I tried to navigate each folder and read the readme files by myself but it was not possible for me, since there was a total of ~20,000 readme files in the subfolders.

So I had an idea to try and scrape everything using a script.

## Tools I Used

There are different tools and technologies that can be used to scrape all the readme files. I used packages like:

- **axios** - for making HTTP requests to fetch the files
- **cheerio** - for parsing HTML and extracting content from web pages  
- **pLimit** - for controlling the rate of concurrent requests to avoid overwhelming the server

By that, I was able to successfully obtain the flag from:
`http://{IP}/.hidden/whtccjokayshttvxycsvykxcfm/igeemtxnvexvxezqwntmzjltkt/lmpanswobhwcozdqixbowvbrhw/README`

## The Vulnerability Here

- The attacker can scrape the website and retrieve and collect data
- Aggressive scrapers can flood your server with hundreds of requests/second
- **Risk:** Increased CPU, database load, and site crashes
- If Google detects that your content is duplicated or scraped, you may be penalized in search rankings

## How to Prevent This

There's no perfect protection — but you can discourage 99% of scrapers with layered defense:

- Use `limit_req` to limit request rates
- Delay or dynamically load sensitive data via JavaScript
- Place invisible links or fields that normal users won't see. If bots click them → ban or flag IP
- Implement CAPTCHA for suspicious behavior
- Use proper authentication for sensitive directories