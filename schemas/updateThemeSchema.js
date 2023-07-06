const Joi = require('joi');

const updateThemeSchema = Joi.object({
  theme: Joi.string().required().valid('light', 'dark', 'violet').messages({
    'any.required': 'missing field theme',
    'any.only': "Can be only 'light', 'dark', 'violet'",
  }),
});

module.exports = updateThemeSchema;
