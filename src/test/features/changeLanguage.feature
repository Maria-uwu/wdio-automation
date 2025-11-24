Feature: User interactions after login on Practice Software Testing website

Background:
  Given the user is on the login page
  When the user enters a valid email and password
  When clicks the "Login" button
  Then the user should see the dashboard
  And their name should appear in the navigation bar

Scenario: User changes the website language
  Given the user is in the home page
  When the user selects a different language from the language dropdown
  Then the interface text should change to Spanish
  And the language preference should remain active after refresh

