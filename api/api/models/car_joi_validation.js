const joi= require('joi');

const carValSchema = joi.object().keys({
	_id: joi.any(),
	userId: joi.any(),
	model: joi.string(),
	brand: joi.string(),
	year: joi.number().min(1769).max(2100),
	price: joi.number(),
	color: joi.string(),
});

module.exports = carValSchema;