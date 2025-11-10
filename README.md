🧪 WDIO Automation Project

Automated UI testing framework built with WebdriverIO, Cucumber (BDD), and JavaScript.
Developed as part of the EPAM Automation Practice by Maria Paula Vargas Rincon.

Includes a multi-browser setup (Chrome, Firefox, Safari), parallel execution, headless mode, and retry logic for unstable tests.

🚀 How to Run the Tests
1️⃣ Install dependencies

npm install

2️⃣ Run all tests in headless mode

npx wdio run ./src/config/wdio.conf.js


⚙️ Features

✅ BDD structure using Gherkin (.feature files)

✅ Parallel execution (maxInstances: 2)

✅ Auto retry (runs failing specs up to 2 times)

✅ Multi-browser support (Chrome, Firefox, Safari)

✅ Headless mode for faster CI/CD runs

✅ Page Object Model (POM) for reusable locators and actions

🧠 BDD Scenarios Implemented

Feature: User interactions on Practice Software Testing website

Scenario 1: User successfully creates a new account (Sign up)

Given the user is on the Sign Up page
When the user fills in all mandatory fields with valid information
When clicks the "Register" button
Then the user should be redirected to the Login page

Background (Scenario 2): User logs in

Given the user is on the login page
When the user enters a valid email and password
When clicks the "Login" button
Then the user should see the dashboard
And their name should appear in the navigation bar

Scenario 3: User updates profile information

Given the user is logged in and on the Profile page
When the user updates their phone number and address
When clicks the "Save" button
Then a confirmation message should be displayed
And the updated information should be visible in the profile

Scenario 4: User adds a product to favorites

Given the user is viewing a product details page
When clicks the "Add to favorites" button
Then a success message should be displayed
Then the product should appear in My favorites

Scenario 5: User adds a product to the basket

Given the user is viewing a product details page
When clicks the "Add to cart" button
Then a success message should be displayed
And the basket counter should increase by one

Scenario 6: User completes a checkout successfully

Given the user is viewing a product details page
When clicks the "Add to cart" button
Then a success message should be displayed
And the basket counter should increase by one
When the user proceeds to checkout
And enters valid shipping information
And enters valid payment information
Then the order should be placed successfully

Scenario 7: User searches for an exact product by name

Given the user is in the home page
When the user types "Claw Hammer with Fiberglass" into the search bar
And clicks the search icon
Then the search results should display only the "Claw Hammer with Fiberglass" product

Scenario 8: User changes the website language

Given the user is in the home page
When the user selects a different language from the language dropdown
Then the interface text should change to Spanish
And the language preference should remain active after refresh