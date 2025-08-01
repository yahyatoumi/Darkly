# Client-Side Validation Bypass Vulnerability Report

## What I Found

The backend server relies on the client-side user input without validation.

## The Problem

Even though the user can only access values from 1 to 10 in the UI select element, with minimum knowledge, they can inspect the page and change the select value, or send a request from the browser or using other tools with big values.

## How This Can Be Exploited

By doing that, the user can use big values. With that, they can manipulate the database in unwanted ways.

## How to Prevent This

To avoid that, we should make sure that the data sent from the user is validated. For this case, in the backend we should check if the value is between 1 and 10.

## Key Lesson

We should never rely on the data we're going to be receiving from the client.