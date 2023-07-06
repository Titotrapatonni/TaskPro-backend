const Joi = require('joi');

const addSchema = Joi.object({
  parentColumn: Joi.string().required().length(24).messages({ 'any.required': 'missing required parentColumn id' }),
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid('without', 'low', 'medium', 'high').messages({
    'any.only': "Can be only 'without', 'low', 'medium', 'high'",
  }),
  deadline: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/),
});

const editTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().required().valid('without', 'low', 'medium', 'high').messages({
    'any.only': "Can be only 'without', 'low', 'medium', 'high'",
  }),
  deadline: Joi.string()
    .required()
    .regex(/^\d{2}-\d{2}-\d{4}$/),
  parentColumn: Joi.string().required(),
});

const changeParentColumnSchema = Joi.object({
  parentColumn: Joi.string().required().length(24).messages({ 'any.required': 'missing required parentColumn field' }),
});

const moveTaskSchema = Joi.object({
  columnSourceOrder: Joi.object().required().messages({ 'any.required': 'missing required columnSourceOrder' }),
  columnDestinationOrder: Joi.object()
    .required()
    .messages({ 'any.required': 'missing required columnDestinationOrder' }),
});

const schemas = {
  addSchema,
  editTaskSchema,
  changeParentColumnSchema,
  moveTaskSchema,
};

module.exports = schemas;
