const Joi = require('joi');


const getAllSchema = Joi.object({
  parentBoard: Joi.string()
    .required()
    .length(24)
    .messages({ 'any.required': 'missing required parentBoard id' }),
});

const addSchema = Joi.object({
  parentBoard: Joi.string()
    .required()
    .length(24)
    .messages({ 'any.required': 'missing required parentBoard id' }),
  title: Joi.string(),
});

const editSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required title' }),
});

const schemas = {
  getAllSchema,
  addSchema,
  editSchema,
};

module.exports = schemas;
