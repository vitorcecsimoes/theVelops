import React, { Component } from 'react';
import './App.css';
import UserInput from './Components/UserInput/UserInput';
import UserOutput from './Components/UserOutput/UserOutput';
import Test from './Components/Test/Test';
import axios from 'axios';


class App extends Component {
	
	state ={
		users:[],
		login:{
			email: "email",
			password: "password",
		},
		showGetUser: false,
		showLogin: true,
		showSignUp: false,
		showEditUser: false,
		showEditPassword: false,
		usersLoaded: false
	}

	showLoginHandler =() =>{
		this.setState({showLogin: true});
		this.setState({showGetUser: false});
		this.setState({showEditUser: false});
	}

	showSignUpHandler =()=>{
		this.setState({showSignUp: true});
		this.setState({showLogin: false});
	}

	showGetUserHandler =() =>{
		this.setState({showGetUser: true});
		this.setState({showLogin: false});
		this.setState({showSignUp: false});
		this.setState({showEditUser: false});
		this.setState({showEditPassword: false});
	}

	showEditUserHandler =() =>{
		this.setState({showEditUser: true});
		this.setState({showGetUser: false});
	}

	showEditPasswordHandler =() =>{
		this.setState({showEditPassword: true});
		this.setState({showGetUser: false});
	}

	inputChangedHandler = (event, field) =>{
	  	const loginHold = {...this.state.login};
	  	loginHold[field] = event.target.value;
	  	this.setState({login: loginHold});
	};

	getAllHandler =() => {
		axios.get('http://127.0.0.1:3500/users/')
			.then(response => {
				this.setState({users: response.data});
				this.setState({usersLoaded: true});
			});
	}



	render() {


		const style ={
			font: 'inherit',
			padding: '8px',
			margin: '5px'
		};


		//----------------LOGIN SCREEN-----------\\
		if (this.state.showLogin){
			return (<div className="App">
				<h1>Login</h1>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "email")}
					currentName = {this.state.login.email}/>
				<UserInput
					 changed = {(event) => this.inputChangedHandler(event, "password")}
					 currentName = {this.state.login.password}/>
				<div>
					<button
						style = {style}
						onClick={()=> {
							this.showGetUserHandler();
							this.getAllHandler();
						}}>Login</button>
				</div>
				<div>
					<button style = {style} onClick={this.showSignUpHandler}>Sign Up</button>
				</div>
				
			</div>);
		};

		//----------------SGIN UP SCREEN-----------\\
		if (this.state.showSignUp){
			return (<div className="App">
				<h1>Create Users</h1>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "email")}
					currentName = {this.state.users.email}/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "firstName")}
					currentName = {this.state.users.firstName}/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "lastName")}
					currentName = {this.state.users.lastName}/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "phone")}
					currentName = {this.state.users.phone}/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "password")}
					currentName = {this.state.users.password}/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "password")}
					currentName = "re-type password"/>
				<div>
					<button style = {style} onClick={this.showGetUserHandler}>Submit</button>
				</div>
			</div>
			);
		};

		//----------------GET USERs SCREEN-----------\\
		if (this.state.showGetUser){
			if (this.state.usersLoaded) {
				const user = this.state.users.filter(user => user.email === this.state.login.email);
				console.log(user);
				return (<div className="App">
					<h1>Get Users</h1>
					<UserOutput value = {user[0].email}/>
					<UserOutput value = {user[0].firstName}/>
					<UserOutput value = {user[0].lastName}/>
					<UserOutput value = {user.phone}/>
					<div>
						<button style = {style} onClick={this.showEditUserHandler}>Edit Users</button>
					</div>
					<div>
						<button style = {style} onClick={this.showEditPasswordHandler}>Edit Password</button>
					</div>
					<div>
						<button style = {style} onClick={this.showLoginHandler}>Logout</button>
					</div>
				</div>);
			};
			return(<p>Loading...</p>);
		};


		//----------------EDIT USERs SCREEN-----------\\
		if (this.state.showEditUser){
			return (<div className="App">
				<h1>Edit Users</h1>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "email")}
					currentName = {this.state.users.email}/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "firstName")}
					currentName = {this.state.users.firstName}/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "lastName")}
					currentName = {this.state.users.lastName}/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "phone")}
					currentName = {this.state.users.phone}/>
				<div>
					<button style = {style} onClick={this.showGetUserHandler}>Submit</button>
				</div>
				<div>
					<button style = {style} onClick={this.showLoginHandler}>Delete Users</button>
				</div>
			</div>);
		};


		//----------------EDIT PASSWORD SCREEN-----------\\
		if (this.state.showEditPassword){
			return (<div className="App">
				<h1>Edit Password</h1>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "password")}
					currentName = "old password"/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "password")}
					currentName = "new password"/>
				<UserInput
					changed = {(event) => this.inputChangedHandler(event, "password")}
					currentName = "re-type password"/>
				<div>
					<button style = {style} onClick={this.showGetUserHandler}>Submit</button>
				</div>
			</div>);
		};
	}
}

export default App;
