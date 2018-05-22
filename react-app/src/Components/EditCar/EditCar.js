import React from 'react';
import'../../Button.css';


const editCar = (props) =>{
	return (<div className = "App">
		<h1>Edit User Car</h1>
		<ErrorMessage message = {this.state.errorMessage}/>
		<UserInput
			changed = {(event) => this.inputChangedCarHandler(event, "brand")}
			fieldName = {"Brand"}/>
		<UserInput
			changed = {(event) => this.inputChangedCarHandler(event, "model")}
			fieldName = {"Model"}/>
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
			<button className="Button" onClick={this.editCarHandler}>Submit</button>
		</div>
	</div>);
};

export default editCar;