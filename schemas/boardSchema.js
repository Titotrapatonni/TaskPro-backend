const Joi = require('joi');

const boardSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'missing required Board title' }),
  currentBg: Joi.number(),
  icon: Joi.string().optional(),
  owner: Joi.string(),
});

module.exports = boardSchema;
