# theVelops
-----
This is the solution to the theVelops Assessment

## Part One
The REST API is in the folder "api" and it has the following routes

**GET**/users - to get a JSON array from the database

**POST**/users - to create a new user entry on the database

**GET**/users/:id - to get an specific user

**PUT**/users/:id - to edit any user property

**DELETE**/users/:id - to delete an user

All the responses recieved are in JSON format

With the **PUT** it is possible to edit any number of properties in the user object.

## Part Two
The REACT APP is in the react-app folder

It currently has a working screen flow to
It get users from the database comparing with the provided e-mail in the login screen
