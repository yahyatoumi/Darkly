this breach is mainly because of the bady incryipted "I_am_admin" cookie which is used to detirmin if the user is admn or not,
the problme is that the website backend use a simple and easy to find atnd descript algorithms its called "MD5"
to find the flag i simply pasted the token on the search engine, by that i got result that the token is the incryption of the value "false"
using MD5 for hashing, so i simply hashed the value true and repliced the previous cookie value with the new token i got
and i got the flag back to me,

that is a big problem and vornlability on he web site because detimenating whether a user is an admin or not should not be relying at all on the client side,
instead it should be done on the backend, and based on weather a user is admin or not the will be having access to diffrent data/ui... on the browser
