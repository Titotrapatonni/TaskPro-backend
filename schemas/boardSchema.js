const Joi = require("joi");

const boardSchema = Joi.object({
    title: Joi.string()
      .required()
      .messages({ "any.required": "missing required Board title" }),
    currentBg: Joi.string().uri(),
    icon: Joi.string().uri().optional(),
    owner: Joi.string().required(),
  });
  
  module.exports = boardSchema;