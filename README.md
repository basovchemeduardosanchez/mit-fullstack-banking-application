# MIT Fullstack Banking Application

# Requirements

- [X] User can create an account with an email address and password input field. User receives a success message after creating an account
- [X] After creating an account, email address or username appears in the top right corner
- [X] User can log in to an account with an email address/password or OAuth
- [X] User can log out of an account
- [X] User can deposit money
- [X] Total balance updates according to deposit amount
- [X] User can withdraw money
- [X] Total balance updates according to withdrawal amount
- [X] The total balance amount and any other user input persists through different user sessions
- [X] Logging out of the application does not reset the user data
- [X] A screenshot showing a data representation of user information and account balance is uploaded

# Data Representation

![Data Representation](./images/data-representation.png)

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

## Print data representation in the terminal

```bash
mongo myproject --eval 'db.users.find().pretty()'
```

# Resources

- https://create-react-app.dev/docs/proxying-api-requests-in-development
- https://stackoverflow.com/a/61927857/1714951
- https://reactjs.org/docs/context.html
- https://stackabuse.com/redirects-in-react-router/
- https://www.youtube.com/watch?v=_HdrLsyAdJg
- https://stackoverflow.com/a/14713363/1714951
- https://www.mongodb.com/docs/manual/tutorial/write-scripts-for-the-mongo-shell/#std-label-mongo-shell-scripting