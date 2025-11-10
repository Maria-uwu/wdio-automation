Feature: User interactions after login on Practice Software Testing website

Background:
  Given the user is on the login page
  When the user enters a valid email and password
  When clicks the "Login" button
  Then the user should see the dashboard
  And their name should appear in the navigation bar

Scenario: User updates profile information
  Given the user is logged in and on the Profile page
  When the user updates their phone number and address
  When clicks the "Save" button
  Then a confirmation message should be displayed
  And the updated information should be visible in the profile

Scenario: User adds a product to favorites
  Given the user is viewing a product details page
  When clicks the "Add to favorites" button
  Then a success message should be displayed
  Then the product should appear in My favorites

Scenario: User adds a product to the basket
  Given the user is viewing a product details page
  When clicks the "Add to cart" button
  Then a success message should be displayed
  And the basket counter should increase by one

Scenario: User completes a checkout successfully
  Given the user is viewing a product details page
  When clicks the "Add to cart" button
  Then a success message should be displayed
  And the basket counter should increase by one
  When the user proceeds to checkout
  And enters valid shipping information
  And enters valid payment information
  Then the order should be placed successfully

Scenario: User searches for an exact product by name
  Given the user is in the home page
  When the user types "Claw Hammer with Fiberglass" into the search bar
  And clicks the search icon
  Then the search results should display only the "Claw Hammer with Fiberglass" product

Scenario: User changes the website language
  Given the user is in the home page
  When the user selects a different language from the language dropdown
  Then the interface text should change to Spanish
  And the language preference should remain active after refresh

