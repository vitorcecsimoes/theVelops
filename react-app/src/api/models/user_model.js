const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: String,
	firstName: String,
	lastName: String,
	phone: String
});

module.exports = mongoose.model('User', userSchema );