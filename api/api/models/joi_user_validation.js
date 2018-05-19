const joi= require('joi');

const userValSchema = joi.object().keys({
	_id: joi.any(),
	email: joi.string().email().required(),
	firstName: joi.string().alphanum().required(),
	lastName: joi.string().alphanum().required(),
	phone: joi.string().required(),
	password: joi.string().alphanum().required()
});

module.exports = userValSchema;