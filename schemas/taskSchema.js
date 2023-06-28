const Joi = require('joi');

const getAllSchema = Joi.object({
  parentColumn: Joi.string().required().length(24).messages({ 'any.required': 'missing required parentColumn id' }),
});

const addSchema = Joi.object({
  parentColumn: Joi.string().required().length(24).messages({ 'any.required': 'missing required parentColumn id' }),
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
