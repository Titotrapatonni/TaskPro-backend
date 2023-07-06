const Joi = require('joi');

const addSchema = Joi.object({
  parentBoard: Joi.string().required().length(24).messages({ 'any.required': 'missing required parentBoard id' }),
  taskOrder: Joi.array(),
  title: Joi.string(),
});

const editSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'missing required title' }),
  taskOrder: Joi.array(),
});

const editTaskOrderSchema = Joi.object({
  taskOrder: Joi.array().required().messages({ 'any.required': 'missing required Task order' }),
});

const schemas = {
  addSchema,
  editSchema,
  editTaskOrderSchema,
};

module.exports = schemas;
