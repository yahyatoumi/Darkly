as we can see in the website footer, there are some social media icons and links, which yo can follow to get to the website twitter, facebook, instagram
i found ou that the links that redictes you to the social media account is in this format "http://10.12.100.215/index.php?page=redirect&site=facebook"
once you click the icon you are going to be redirected to the websites facebook account,
there are icons for facebook, instagram and twitter, 

you can try to visite http://10.12.100.215/index.php?page=redirect&site=someotherwebsite 
and you will get the flag,

this breach is considred a breach because user following the last link can lead them to untrusted websites
for example a hacker can create a malicioussite for fishing and stealing informations

to avoid that we should make a list of trusted website and check if the site parameter on the url the user trying to visit is on the whitelist
if the site is on the whitelist after that, and only after that we redirect the user to that website

