# theVelops
-----
This is the solution to the theVelops Assessment

## API
The REST API is in the folder "api" and it has the following routes

- **GET**/users - to get a JSON array from the database
- **POST**/users - to create a new user entry on the database
- **GET**/users/:userId - to get an specific user
- **PUT**/users/:userId - to edit any user property
- **DELETE**/users/:userId - to delete an user
- **GET**/users/:userId/cars - to get a JSON array with all the cars of the associated user
- **POST**/users/:userId/cars - to add a new car associated with the user on the database
- **PUT**/cars/:carId - to edit an especific car
- **DELETE**/cars/:carId - to delete a car


All the responses recieved are in JSON format

The user body in the **POST** request must have the following properties:

```
{
	email: '',
	firstName: '',
	lastName: '',
	phone: '',
	password: ''
}
```

The car body in the **POST** request must have the following properties:

```
{
	car: 'carModelHere',
	brand: '',
	year: '',
	price: '',
	color: ''
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




## APP
The REACT APP is in the react-app folder

It currently has the folloeing screens:

#### Login Screen
- With Email, and Password fields
- Login button
- Sign Up button

It get users from the database comparing with the provided e-mail and validate the password, if correct the user is redirected to the Get User screen

#### Sign Up

- With all the fields to fill the user information required by the API
- A re-type passord field
- Submit button

If both password are the same and no fill error was found the user is created and upload to the database.
Then the user is redirected to the Get User screen

#### Get User Cars

- It displays all the cars associated with the user.
- Edit and delete option for each of the cars.
- The pictures of the cars are still not displayed, it shows a "pic" placeholder instead
- It also has buttons to all the following pages.


#### Get User
This page displays the user information, and it can be edited by clickng the Edit User and the Edit Password buttons.
It also has a return button to return to the Get User Cars page

#### Edit User
It has all the fields to edit the user information. The fields are already filled with the current user information.

#### Edit Password

-an old-password field that confirms if the old password is valid before sending the PUT request to change password
-a new password and a re-type password field that validade with each other to check if both entry are the same before sending the put request. 

#### Add User Car

- With all the fields to fill the car information required by the API
- A submit image button is also in place, however it is still non-functional

#### Edit User Car

- With all the fields to fill the car information required by the API
- An edit image button is also in place, however it is still non-functional


Uppon any entry error, or invalid login a message in red is displayed below the screen header


## Running the API and the APP with NodeJS

### Node modules requirements

#### API
To run the API you will need to install the following node modules:

    body-parser
    express
    joi
    mongoose
    morgan

You may also want to change the MongoDB path in the /api/app.js

#### APP
To run the API you will need to install the following node modules:

    axios
    react
    react-dom
    react-scripts

### Starting

To start the API you will need to run `npm start` in the ./api folder, the same thing goes for the APP, you will need to run  `npm start` in the ./react-app folder.

With both processes running you are good to go
