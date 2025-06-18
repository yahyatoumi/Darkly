by using brute force tools such as DirBuster, i was able to find out that the server can serve files such as:
/admin and /whatever/htpasswd

/whatever/htpasswd includes "root:437394baff5aa33daa618be47b75cb49"
you can after that find out that the token is a encrypted password for qwerty123@

after that you can be able to reach the /admin page which has a login for
entering root as username and qwerty123@ as password can grant you authentication

doing some researches i was able to find out that the /whatever/htpasswd is a reference for .htpasswd file 
its a file used in apache web server to store authentication credinsials, 
the criedentals are stored in "username:password" where the password is the encrypted version of the real password

this breach mainly happens because the developer do not secure the access to the file
in best practice the developer who sets up the apache or nginx or whatever web server
should make sure that the user can't access sensitive derictories and files, for example to the whatever folder in this case, and to .env file for example also
and should also try not allowing ip adress to spam a lot of request in a time, 