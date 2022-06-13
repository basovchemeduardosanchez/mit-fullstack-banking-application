# MIT Fullstack Banking Application

# Requirements

- [ ] User can create an account with an email address and password input field. User receives a success message after creating an account
- [ ] After creating an account, email address or username appears in the top right corner
- [ ] User can log in to an account with an email address/password or OAuth
- [ ] User can log out of an account
- [ ] User can deposit money
- [ ] Total balance updates according to deposit amount
- [ ] User can withdraw money
- [ ] Total balance updates according to withdrawal amount
- [ ] The total balance amount and any other user input persists through different user sessions
- [ ] Logging out of the application does not reset the user data
- [ ] A screenshot showing a data representation of user information and account balance is uploaded

# Contributing

## Prerequisites

1. Install homebrew on macOS
2. Install mongodb
    ```bash
    brew tap mongodb/brew
    brew install mongodb-community
    brew services start mongodb-community
    # Use the following command to stop it
    #brew services stop mongodb-community
    ```

## Run

```bash
npm run dev
```

# Resources

- https://create-react-app.dev/docs/proxying-api-requests-in-development
- https://stackoverflow.com/a/61927857/1714951
- https://reactjs.org/docs/context.html
- https://stackabuse.com/redirects-in-react-router/
- https://www.youtube.com/watch?v=_HdrLsyAdJg