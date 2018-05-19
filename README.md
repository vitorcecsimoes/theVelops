# theVelops
-----
This is the solution to the theVelops Assessment

## Part One
The REST API is in the folder "api" and it has the following routes

- **GET**/users - to get a JSON array from the database
- **POST**/users - to create a new user entry on the database
- **GET**/users/:id - to get an specific user
- **PUT**/users/:id - to edit any user property
- **DELETE**/users/:id - to delete an user

All the responses recieved are in JSON format

The user in the **POST** request must have the following properties:

```
{
	email: '',
	firstName: '',
	lastName: '',
	phone: '',
	password: ''
}
```

With the **PUT** it is possible to edit any number of properties in the user object.
The request must be an JSON array and the elements must have two properties:

```
{
	propName: "propertyToBeAltered",
	value: "newPropertyValue" 
}
```


## Part Two
The REACT APP is in the react-app folder

It currently has the folloeing screens:

####Login Screen
- With Email, and Password fields
- Login button
- Sign Up button

It get users from the database comparing with the provided e-mail and validate the password, if correct the user is redirected to the Get User screen

####Sign Up

- With all the fields to fill the user information required by the API
- A re-type passord field
- Submit button

If both password are the same and no fill error was found the user is created and upload to the database.
Then the user is redirected to the Get User screen


####Get User

####Edit User

####Edit Password



Uppon any entry error, or invalid login a message in red is displayed below the screen header


-------
##Under Development

- The rest of the README file

###API

- Path for user Cars (**GET**,**POST**,**PUT** and **DELETE**)
- Preventing the creation of two users with the same e-mail
- Request body validation
- Upload of images to s3
- Extra features


###APP

- Login with Facebook
- User Cars page
- Crate Car page
- Edit Car page
- Extra features
