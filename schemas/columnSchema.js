const Joi = require('joi');

const addSchema = Joi.object({
  parentBoard: Joi.string().required().length(24).messages({ 'any.required': 'missing required parentBoard id' }),
  // ===-VR-===
  taskOrder: Joi.array(),
  // ===-VR-===
  title: Joi.string(),
});

const editSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'missing required title' }),
  // ===-VR-===
  taskOrder: Joi.array(),
  // ===-VR-===
});

// ===-VR-===
const editTaskOrderSchema = Joi.object({
  taskOrder: Joi.array().required().messages({ 'any.required': 'missing required Task order' }),
});
// ===-VR-===

const schemas = {
  addSchema,
  editSchema,
  // ===-VR-===
  editTaskOrderSchema,
  // ===-VR-===
};

module.exports = schemas;
