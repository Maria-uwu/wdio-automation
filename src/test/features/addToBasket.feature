Feature: User interactions after login on Practice Software Testing website

Background:
  Given the user is on the login page
  When the user enters a valid email and password
  When clicks the "Login" button
  Then the user should see the dashboard
  And their name should appear in the navigation bar

Scenario: User adds a product to the basket
  Given the user is viewing a product details page
  When clicks the "Add to cart" button
  Then a success message should be displayed
  And the basket counter should increase by one