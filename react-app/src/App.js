import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import './Button.css';

import UserInput from './Components/UserInput/UserInput';
import UserOutput from './Components/UserOutput/UserOutput';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage';
import UserCar from './Components/UserCar/UserCar';


const usersUrl = 'http://127.0.0.1:3500/users/';

class App extends Component {
	
	state ={
		users:[],
		tempUser:{
			email: '',			
			firstName:'',
			lastName:'',
			phone:'',
			password:'',
			rePassword: '',
			oldPassword: ''		
		},

		cars:[],
		tempCar:{
			brand: '',			
			name:'',
			year:'',
			price:'',
			color:'',	
		},

		showGetUser: false,
		showLogin: true,
		showSignUp: false,
		showEditUser: false,
		showEditPassword: false,
		showGetCar: false,
		showEditCar: false,
		showAddCar: false,
		carLoaded:false,
		usersLoaded: false,
		errorMessage: null
	}


	//--------------------------------------\\
	//				HANDLERS				\\
	//--------------------------------------\\

	//-------------SCREEN HANDLERS-----------\\
	showLoginHandler =() =>{
		this.setState({
			showGetUser: false,
			showLogin: true,
			showSignUp: false,
			showEditUser: false,
			showEditPassword: false,
			showGetCar: false,
			showEditCar: false,
			showAddCar: false
		});
	}

	showSignUpHandler =()=>{
		this.setState({
			showGetUser: false,
			showLogin: false,
			showSignUp: true,
			showEditUser: false,
			showEditPassword: false,
			showGetCar: false,
			showEditCar: false,
			showAddCar: false
		});
	}

	showGetUserHandler =() =>{
		this.setState({
			showGetUser: true,
			showLogin: false,
			showSignUp: false,
			showEditUser: false,
			showEditPassword: false,
			showGetCar: false,
			showEditCar: false,
			showAddCar: false
		});
	}

	showGetCarHandler =() =>{
		this.setState({
			showGetUser: false,
			showLogin: false,
			showSignUp: false,
			showEditUser: false,
			showEditPassword: false,
			showGetCar: true,
			showEditCar: false,
			showAddCar: false
		});
	}

	showGetCarHandler =() =>{
		this.setState({
			showGetUser: false,
			showLogin: false,
			showSignUp: false,
			showEditUser: false,
			showEditPassword: false,
			showGetCar: true,
			showEditCar: false,
			showAddCar: false
		});
	}

	showGetCarHandler =() =>{
		this.setState({
			showGetUser: false,
			showLogin: false,
			showSignUp: false,
			showEditUser: false,
			showEditPassword: false,
			showGetCar: true,
			showEditCar: false,
			showAddCar: false
		});
	}

	showEditUserHandler =() =>{
		this.setState({
			showGetUser: false,
			showLogin: false,
			showSignUp: false,
			showEditUser: true,
			showEditPassword: false,
			showGetCar: false,
			showEditCar: false,
			showAddCar: false
		});
	}

	showEditPasswordHandler =() =>{
		this.setState({
			showGetUser: false,
			showLogin: false,
			showSignUp: false,
			showEditUser: false,
			showEditPassword: true,
			showGetCar: false,
			showEditCar: false,
			showAddCar: false
		});
	}

	showEditCarHandler =() =>{
		this.setState({
			showGetUser: false,
			showLogin: false,
			showSignUp: false,
			showEditUser: false,
			showEditPassword: false,
			showGetCar: false,
			showEditCar: true,
			showAddCar: false
		});
	}

	showAddCarHandler =() =>{
		this.setState({
			showGetUser: false,
			showLogin: false,
			showSignUp: false,
			showEditUser: false,
			showEditPassword: false,
			showGetCar: false,
			showEditCar: false,
			showAddCar: true
		});
	}

	//-------------INPUT HANDLERS-----------\\

	inputChangedLoginHandler = (event,field) =>{
		const tempUser = {...this.state.tempUser};
		tempUser[field] = event.target.value;
		this.setState({tempUser: tempUser});
	}

	inputChangedEditUserHandler = (event,field) =>{
		const tempUser = this.state.users[0];
		tempUser[field] = event.target.value;
		this.setState({tempUser: tempUser});
	}

	inputChangedEditPasswordHandler = (event,field) =>{
		const tempUser = {...this.state.tempUser};
		tempUser[field] = event.target.value;
		this.setState({tempUser: tempUser});
	}


	//-------------API HANDLERS-----------\\

	loginHandler =() => {
		axios.get(usersUrl)
			.then(response => {
				const user = response.data.filter(user => user.email === this.state.tempUser.email);
				if (user[0]) {
					if (user[0].password===this.state.tempUser.password){
						this.setState({users: user});
						this.setState({usersLoaded: true});
						this.showGetUserHandler();
					} else{
						this.setState({errorMessage: "invalid password"});
						this.showLoginHandler();
					}
				} else {
					this.setState({errorMessage: "invalid e-mail"});
					this.showLoginHandler();
				}
			});
	}

	submitUserHandler =() => {
		if(this.state.tempUser.password === this.state.tempUser.rePassword){
			axios.post(usersUrl, this.state.tempUser)
				.then( ()=>{
					const user = [this.state.tempUser];
					this.setState({users: user, errorMessage: null});
					this.loginHandler();
					this.showGetUserHandler();
				})
				.catch(err => {
					console.log(err);
					this.setState ({errorMessage: "invalid entry"});
					this.showSignUpHandler();
				});
		} else {
			this.setState ({errorMessage: "passwords don't match!"});
			this.showSignUpHandler();
		}
	};


	editUserHandler =() =>{
		const id = this.state.users[0]._id;
		const editor = [{
			propName: "email",
			value: this.state.tempUser.email
		},{
			propName: "firstName",
			value: this.state.tempUser.firstName
		},{	
			propName: "lastName",
			value: this.state.tempUser.lastName
		},{
			propName: "phone",
			value: this.state.tempUser.phone
		}];
		axios.put(usersUrl+id, editor)
			.then(() =>{
				this.setState ({errorMessage: null});
				this.showGetUserHandler();
			})
			.catch(err => {
				console.log(err);
				this.setState ({errorMessage: "invalid entry"});
				this.showEditUserHandler();
			});
	}

	editPasswordHandler =() =>{
		const id = this.state.users[0]._id;
		if (this.state.tempUser.oldPassword === this.state.users[0].password){
			if(this.state.tempUser.password === this.state.tempUser.rePassword){
				const editor = [{
					propName: "password",
					value: this.state.tempUser.password
				}];
				axios.put(usersUrl+id, editor)
					.then( () =>{
						this.setState ({errorMessage: null});
						this.showGetUserHandler();
					})
					.catch(err => {
						console.log(err);
						this.setState ({errorMessage: "invalid entry"});
						this.showEditPasswordHandler();
					});
			} else {
				this.setState ({errorMessage: "passwords don't match!"});
				this.showEditPasswordHandler();
			}
		} else {
			this.setState ({errorMessage: "invalid old password!"});
			this.showEditPasswordHandler();
		}
	}


	deleteUsersHandler =() =>{
		const id = this.state.users[0]._id;
		axios.delete(usersUrl+id)
			.catch(err => {
				console.log(err);
				this.setState ({errorMessage: "delete error"});
				this.showGetUserHandler();
			});

	}


	//--------------------------------------\\
	//				  RENDER				\\
	//--------------------------------------\\

	render() {


		//----------------LOGIN SCREEN-----------\\
		if (this.state.showLogin){
			return (<div className="App">
				<h1>Login</h1>
				<ErrorMessage message = {this.state.errorMessage}/>
				<UserInput
					changed = {(event) => this.inputChangedLoginHandler(event, "email")}
					fieldName = {"e-mail"}/>
				<UserInput
					 changed = {(event) => this.inputChangedLoginHandler(event, "password")}
					 fieldName = {"password"}/>
				<div>
					<button className="Button" onClick={this.showGetCarHandler}>Login</button>
				</div>
				<div>
					<button className="Button" onClick={this.showSignUpHandler}>Sign Up</button>
				</div>
				
			</div>);
		};

		//----------------SGIN UP SCREEN-----------\\
		if (this.state.showSignUp){
			return (<div className="App">
				<h1>Create Users</h1>
				<ErrorMessage message = {this.state.errorMessage}/>
				<p></p>
				<p></p>
				<UserInput
					changed = {(event) => this.inputChangedLoginHandler(event, "email")}
					fieldName = {"e-mail"}/>
				<UserInput
					changed = {(event) => this.inputChangedLoginHandler(event, "firstName")}
					fieldName = {"First Name"}/>
				<UserInput
					changed = {(event) => this.inputChangedLoginHandler(event, "lastName")}
					fieldName = {"Last Name"}/>
				<UserInput
					changed = {(event) => this.inputChangedLoginHandler(event, "phone")}
					fieldName = {"personal phone" }/>
				<UserInput
					changed = {(event) => this.inputChangedLoginHandler(event, "password")}
					fieldName = {"password" }/>
				<UserInput
					changed = {(event) => this.inputChangedLoginHandler(event, "rePassword")}
					fieldName = {"re-type password"}/>
				<div>
					<button className="Button"	onClick={this.showGetCarHandler}>Submit</button>
				</div>
			</div>
			);
		};


		//----------------GET CAR SCREEN-----------\\
		if (this.state.showGetCar){
			//if (this.state.carLoaded) {
				return (<div className = "App">
					<h1>Get User Car</h1>
					<UserCar/>
					<UserCar/>
					<button className="Button" onClick={ this.showEditUserHandler}>Edit User</button>
					<button className="Button" onClick={ this.showEditPasswordHandler}>Edit Password</button>
					<button className="Button" onClick={ this.showLoginHandler}>Logout</button>
					<button className="Button" onClick={ this.showAddCarHandler}>Add Car</button>
				</div>);
			//};
			//return(<p>Loading...</p>);
		};


		//----------------EDIT CAR SCREEN-----------\\
		if (this.state.showEditCar){
			return (<div className = "App">
				<h1>Edit User Car</h1>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "brand")}
					fieldName = {"Brand"}/>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "name")}
					fieldName = {"Name"}/>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "year")}
					fieldName = {"Year"}/>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "price")}
					fieldName = {"Price"}/>
				<div>
					<button className = "Button">Edit image</button>
				</div>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "color")}
					fieldName = {"Color"}/>
				<div>
					<button className="Button" onClick={ this.showGetCarHandler}>Submit</button>
				</div>
			</div>);
		};


		//----------------ADD CAR SCREEN-----------\\
		if (this.state.showAddCar){
			return (<div className = "App">
				<h1>Edit User Car</h1>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "brand")}
					fieldName = {"Brand"}/>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "name")}
					fieldName = {"Name"}/>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "year")}
					fieldName = {"Year"}/>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "price")}
					fieldName = {"Price"}/>
				<div>
					<button className = "Button">Add image</button>
				</div>
				<UserInput
					changed = {(event) => this.inputChangedCarHandler(event, "color")}
					fieldName = {"Color"}/>
				<div>
					<button className="Button" onClick={ this.showGetCarHandler}>Submit</button>
				</div>
			</div>);
		};


		//----------------GET USER SCREEN-----------\\
		// if (this.state.showGetUser){
		// 	if (this.state.usersLoaded) {
		// 		return (<div className="App">
		// 			<h1>Get Users</h1>
		// 			<UserOutput value = {this.state.users[0].email}/>
		// 			<UserOutput value = {this.state.users[0].firstName}/>
		// 			<UserOutput value = {this.state.users[0].lastName}/>
		// 			<UserOutput value = {this.state.users[0].phone}/>
		// 			<div>
		// 				<button className="Button" onClick={this.showEditUserHandler}>Edit Users</button>
		// 			</div>
		// 			<div>
		// 				<button className="Button" onClick={this.showEditPasswordHandler}>Edit Password</button>
		// 			</div>
		// 			<div>
		// 				<button className="Button" onClick={this.showLoginHandler}>Logout</button>
		// 			</div>
		// 		</div>);
		// 	};
		// 	return(<p>Loading...</p>);
		//};


		//----------------EDIT USER SCREEN-----------\\
		if (this.state.showEditUser){
			const dummyUser = {...this.state.users[0]};
			return (<div className="App">
				<h1>Edit User</h1>
				<p></p>
				<p></p>
				<UserInput
					changed = {(event) => this.inputChangedEditUserHandler(event, "email")}
					fieldName = {dummyUser.email}/>
				<UserInput
					changed = {(event) => this.inputChangedEditUserHandler(event, "firstName")}
					fieldName = {dummyUser.firstName}/>
				<UserInput
					changed = {(event) => this.inputChangedEditUserHandler(event, "lastName")}
					fieldName = {dummyUser.lastName}/>
				<UserInput
					changed = {(event) => this.inputChangedEditUserHandler(event, "phone")}
					fieldName = {dummyUser.phone}/>
				<div>
					<button	className="Button" onClick={this.showGetCarHandler}>Submit</button>
				</div>
				<div>
					<button 
						className="Button" 
						onClick={()=>{
							//this.showLoginHandler();
							this.deleteUsersHandler();
						}}>Delete User</button>
				</div>
			</div>);
		};


		//----------------EDIT PASSWORD SCREEN-----------\\
		if (this.state.showEditPassword){
			return (<div className="App">
				<h1>Edit Password</h1>
				<ErrorMessage message = {this.state.errorMessage}/>
				<UserInput
					changed = {(event) => this.inputChangedEditPasswordHandler(event, "oldPassword")}
					fieldName = "old password"/>
				<UserInput
					changed = {(event) => this.inputChangedEditPasswordHandler(event, "password")}
					fieldName = "new password"/>
				<UserInput
					changed = {(event) => this.inputChangedEditPasswordHandler(event, "rePassword")}
					fieldName = "re-type password"/>
				<div>
					<button className="Button" onClick={this.showGetCarHandler}>Submit</button>
				</div>
			</div>);
		};
	}
}

export default App;
