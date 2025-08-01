# Hidden Form Field Vulnerability Breach Report

## What I Found

Navigating in the application, you can find the sign in page. In that, you click "forgot password". After that, you will get a form which has nothing but a submit button displayed.

## How I Found the Flag

1. By inspecting the page and searching inside that form, I was able to find an input that's hidden with an email in it
2. By simply modifying the already entered email and hitting submit, I got the flag

## Why This is Still a Problem

This teaches us that we should not depend on elements not visible to clients and assume that they will not be able to see and modify them.

A user with little knowledge of web development can still inspect the page and change the visibility of the element.

## Key Lesson

Never trust client-side security - anything sent to the browser can be seen and modified by users.