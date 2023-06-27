const Joi = require('joi');

const getAllSchema = Joi.object({
  parrentBoard: Joi.string()
    .required()
    .length(24)
    .messages({ 'any.required': 'missing required parrentBoard id' }),
});

const addSchema = Joi.object({
  parrentBoard: Joi.string()
    .required()
    .length(24)
    .messages({ 'any.required': 'missing required parrentBoard id' }),
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
