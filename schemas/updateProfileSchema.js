const Joi = require('joi');

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'any.required': 'missing required Name field',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'uk'],
      },
    })
    .required()
    .messages({
      'any.required': 'missing required email field',
    }),
  password: Joi.string().required().messages({
    'any.required': 'missing required password field',
  }),
  avatarURL: Joi.string(),
});

module.exports = updateProfileSchema;
