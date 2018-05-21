const mongoose = require('mongoose');


const carSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	car: {type: String, required: true},
	brand: {type: String, required: true},
	year: {type: Number, required: true},
	price: {type: Number, required: true},
	color: {type: String, required: true}
});

module.exports = mongoose.model('Car', carSchema );