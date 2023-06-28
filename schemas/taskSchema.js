const Joi = require('joi');

const getAllSchema = Joi.object({
  parrentColumn: Joi.string().required().length(24).messages({ 'any.required': 'missing required parrentColumn id' }),
});

const addSchema = Joi.object({
  parrentColumn: Joi.string().required().length(24).messages({ 'any.required': 'missing required parrentColumn id' }),
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid('without', 'low', 'medium', 'high').messages({
    'any.only': "Can be only 'without', 'low', 'medium', 'high'",
  }),
  deadline: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/),
});

const schemas = {
  getAllSchema,
  addSchema,
};

module.exports = schemas;
