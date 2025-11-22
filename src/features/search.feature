Feature: User interactions after login on Practice Software Testing website

Background:
  Given the user is on the login page
  When the user enters a valid email and password
  When clicks the "Login" button
  Then the user should see the dashboard
  And their name should appear in the navigation bar

Scenario: User searches for an exact product by name
  Given the user is in the home page
  When the user types "Claw Hammer with Fiberglass" into the search bar
  And clicks the search icon
  Then the search results should display only the "Claw Hammer with Fiberglass" product

