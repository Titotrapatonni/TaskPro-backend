const Joi = require('joi');

const addSchema = Joi.object({
  parentBoard: Joi.string().required().length(24).messages({ 'any.required': 'missing required parentBoard id' }),

  title: Joi.string(),
});

const editSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'missing required title' }),
});

const schemas = {
  addSchema,
  editSchema,
};

module.exports = schemas;
