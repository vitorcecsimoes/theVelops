const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const joi = require('joi');

const User = require('../models/user_model');
const userJoiVal = require ('../models/user_joi_validation');
const Car = require ('../models/car_model');
const carJoiVal = require ('../models/car_joi_validation');

//--------------------------------------\\
//			USER OEPRATIONS				\\
//--------------------------------------\\

//Get all users in a JSON array
router.get('/users', (req, res, next) =>{
	User.find()
		.select('-__v')
		.exec()
		.then( docs =>{
			res.status(200).json(docs);
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});


//Create a new user
router.post('/users', (req,res,next) => {
	const user = {
		_id: new mongoose.Types.ObjectId(),
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		phone: req.body.phone,
		password: req.body.password,
	};
	
	const validation = joi.validate(user, userJoiVal, (err, value) =>{
		if (err) {
			console.log(err);
			res.status(500).json({error: err});
		} else {
	
			const user = new User(value);

			user.save()
				.then(result => {

					console.log(result);
			
					res.status(201).json({
						message: 'Created user successfully',
						user: value
					});
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({error: err});
				});
		};
	});
});


//GET single user provided the ID
router.get('/users/:iuserId', (req, res, next) =>{
	const id = req.params.userId;
	User.findById(id)
		.select('-__v')
		.exec()
		.then( doc =>{
			if(doc){
				res.status(200).json({
					user: doc
				});
			}else{
				res.status(404).json({
					message: 'No valid entry for provided ID'
				});
			}
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});


//Edit porperties of existing user provided ID
router.put('/users/:userId', ( req,res,next) => {
	const id = req.params.userId;

	User.findById(id, (err, user) => {
		if(err){
			console.log(err);
			res.status(500).json(err);
		} else {
			for (const ops of req.body){
				const field = ops.propName
				const value = ops.value
				let validade = joi.validate({[field]: value}, userJoiVal, (err, value) => {
					if (err) {
						console.log(err);
						res.status(500).json({error: err});
					} else {
							user[ops.propName] = ops.value;
						
					}
				})
			}
		}
		user.save()
			.then(result => {
				console.log(result);
				res.status(201).json({
					message: 'User updated!',
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({error: err});
			});
	});

});


//Delete existing user provided ID
router.delete('/users/:userId', (req,res,next) => {
	const id = req.params.userId; 
	User.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'User deleted',
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});


//--------------------------------------\\
//			CAR OPERATIONS				\\
//--------------------------------------\\

//Get all cars of especific user in a JSON array

router.get('/users/:userId/cars', (req, res, next) =>{
	const userId = req.params.userId;
	
	Car.find({userId: userId})
	.select()
	.exec()
	.then( doc =>{
		if(doc){
			res.status(200).json(doc);
		}else{
			res.status(404).json({
				message: 'No valid entry for provided ID'
			});
		}
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

//Add a new car to existing user
router.post('/users/:userId/cars', (req,res,next) => {
	const userId = req.params.userId;

	const car = {
		_id: new mongoose.Types.ObjectId(),
		userId: userId,
		model: req.body.model,
		brand: req.body.brand,
		year: req.body.year,
		price: req.body.price,
		color: req.body.color
	};
	
	const validation = joi.validate(car, carJoiVal, (err, value) =>{
		if (err) {
			console.log(err);
			res.status(500).json({error: err});
		} else {
	
			const car = new Car(value);

			car.save()
				.then(result => {

					console.log(result);
			
					res.status(201).json({
						message: 'Created car successfully',
						car: value
					});
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({error: err});
				});
		};
	});
});

//Edit existing car
router.put('/cars/:carId', ( req,res,next) => {
	const id = req.params.carId;

	Car.findById(id, (err, car) => {
		if(err){
			console.log(err);
			res.status(500).json(err);
		} else {
			for (const ops of req.body){
				const field = ops.propName
				const value = ops.value
				let validade = joi.validate({[field]: value}, carJoiVal, (err, value) => {
					if (err) {
						console.log(err);
						res.status(500).json({error: err});
					} else {
							car[ops.propName] = ops.value;
						
					}
				})
			}
		}
		car.save()
			.then(result => {
				console.log(result);
				res.status(201).json({
					message: 'Car updated!',
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({error: err});
			});
	});

});

//Delete existing car provided ID
router.delete('/cars/:carId', (req,res,next) => {
	const id = req.params.carId; 
	Car.remove({ _id: id })
		.exec()
		.then(result => {

			res.status(200).json({
				message: 'Car deleted',
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});



module.exports = router;