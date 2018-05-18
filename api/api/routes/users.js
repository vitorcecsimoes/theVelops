const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user_model');

//Get all users in a JSON array
router.get('/', (req, res, next) =>{
	User.find()
		.select('_id email firstName lastName phone')
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
router.post('/', (req,res,next) => {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		phone: req.body.phone
	});
	user.save()
	.then(result => {
		console.log(result);
		
		res.status(201).json({
			message: 'Created user successfully',
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
		});
});

//GET single user provided the ID
router.get('/:id', (req, res, next) =>{
	const id = req.params.id
	User.findById(id)
		.select()
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
			rse.status(500).json({
				error: err
			});
		});
});


router.put('/:id', ( req,res,next) => {
	const id = req.params.id;

	User.findById(id, (err, user) => {
		if(err){
			console.log(err);
			res.status(500).json(err);
		} else {
			for (const ops of req.body){
				user[ops.propName] = ops.value;
			}
		}
		user.save()
		.then(result => {
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


router.delete('/:id', (req,res,next) => {
	const id = req.params.id; 
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

module.exports = router;