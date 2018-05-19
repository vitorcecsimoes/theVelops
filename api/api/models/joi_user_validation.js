const joi= require('joi');

const userValSchema = joi.object().keys({
	_id: joi.any(),
	email: joi.string().email(),
	firstName: joi.string().alphanum(),
	lastName: joi.string().alphanum(),
	phone: joi.string().min(8),
	password: joi.string()
});

module.exports = userValSchema;