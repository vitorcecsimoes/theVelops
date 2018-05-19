import React from 'react';
import './ErrorMessage.css';

const message = (props) =>{

	return (
		<div className = "ErrorMessage">
			<p>{props.message}</p>
		</div>
	);
};

export default message;