# Open Redirect Vulnerability Breach Report

## What I Found

As we can see in the website footer, there are some social media icons and links, which you can follow to get to the website's Twitter, Facebook, Instagram.

## How the Links Work

I found out that the links that redirect you to the social media accounts are in this format:
`http://{IP}/index.php?page=redirect&site=facebook`

Once you click the icon, you are going to be redirected to the website's Facebook account.

There are icons for Facebook, Instagram and Twitter.

## How I Got the Flag

You can try to visit:
`http://{IP}/index.php?page=redirect&site=someotherwebsite`

And you will get the flag.

## Why This is a Breach

This breach is considered a breach because users following the last link can lead them to untrusted websites. For example, a hacker can create a malicious site for phishing and stealing information.

## How to Prevent This

To avoid that, we should make a list of trusted websites and check if the site parameter in the URL the user is trying to visit is on the whitelist.

If the site is on the whitelist, after that, and only after that, we redirect the user to that website.