const Joi = require("joi");

const columnSchema = Joi.object({
  title: Joi.string().required(),
  parrentBoard: Joi.string()
    .required()
    .length(24)
    .messages({ "any.required": "missing required parrentBoard id" }),
});

module.exports = columnSchema;
