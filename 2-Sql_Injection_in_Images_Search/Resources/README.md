# Hash Decoding Challenge Report

## What I Found

Performing the same steps as in the "SQL injection in members search" resulted in getting:

`5 borntosec.ddns.net/images.png Hack me ? If you read this just use this md5 decode lowercase then sha256 to win this flag ! : 1928e8083cf461a51303633093573c46`

## How I Solved It

1. By decoding `1928e8083cf461a51303633093573c46` using MD5 hashing algorithm, I got "albatroz"

2. After that, I hashed "albatroz" using SHA256

3. I ended up with `f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188` as the flag

## Technical Process

- **Step 1:** MD5 hash decode: `1928e8083cf461a51303633093573c46` → `albatroz`
- **Step 2:** SHA256 hash: `albatroz` → `f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188`