import React from 'react';
import './UserCar.css';

const userCar = (props) =>{

	return (
		<div className = "UserCar">
			<p>pic</p>
			<p>Car: {props.model} </p>
			<p>Brand: {props.brand} </p>
			<p>Year: {props.year} </p>
			<p>Price: {props.price} </p>
			<p>Color: {props.color} </p>
			<button>Edit</button>
			<button>Delete</button>
		</div>
	);
};

export default userCar;