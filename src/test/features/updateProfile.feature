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