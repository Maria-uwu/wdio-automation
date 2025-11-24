Feature: User interactions on Practice Software Testing website

Scenario: User successfully creates a new account/Sign up
  Given the user is on the Sign Up page
  When the user fills in all mandatory fields with valid information
  When clicks the "Register" button
  Then the user should be redirected to the Login page