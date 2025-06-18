this breach is brute force breach,

i found that it is possible to brute force your way to login
simply created a script to try login in with pre guessed usernames and passwords
since we were already able to navigate the database duo to the sql injection vornability, 
in this case we already know that there are two users with users names ["root", "admin"] 

so by doing that i was able to brute force my way to send login requests with difrent usernames and passwrods,
i was eventualy able to find the flag by login with root as username and shadow as password


this breach is a very big breach, it can give the attacker the user criedentials so thay can loggin as the user that they found the username and password that belongs to them

1. this mainly happens because the users use well known and widly user passwords
2. the developer made it possible for the attacker to spam and brute thier way trhough testing alot of usernames and passwords

to prevent that
1. the users should'nt be setting easy to guess and widly used passwords
2. we shouldn make the users able to set tjier passwords to easy an widely used passwords
3. we shoul empliment "account lockout policy" so the user can t attempt to login a lot of times for certen time,
4. we should consider bllocking for some times adress ips if they attempted alot of requests to the server
5. we should keep track of users that try attempting to do these kind of attacks to take actions against them
