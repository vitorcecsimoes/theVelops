import React from 'react';
import './UserCar.css';
import'../../Button.css';

const userCar = (props) =>{

	return (
		<div className = "UserCar">
			<div className = "Row">
				<div className = "Column">
					<div className = "Center">
						<p>pic</p>
					</div>
				</div>
				<div className = "Column">
					<div>
						<p>Car: {props.model} </p>
						<p>Brand: {props.brand} </p>
						<p>Year: {props.year} </p>
						<p>Price: {props.price} </p>
						<p>Color: {props.color} </p>
					</div>
				</div>
				<div className = "Column">
					<div className = "Center">
						<div>
							<button className = "Button">Edit</button>
						</div>
						<div>
							<button className = "Button">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default userCar;