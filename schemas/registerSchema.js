const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().pattern(/^[A-Za-z0-9!@#$%^&*()-=_+{}\[\]|\\;:'",.<>/?]{2,32}$/),
  email: Joi.string().email().required().messages({ 'any.required': 'missing required email field' }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-=_+{}\[\]|\\;:'",.<>/?]{8,64}$/)
    .messages({ 'any.required': 'missing required password field' }),
});

module.exports = registerSchema;
