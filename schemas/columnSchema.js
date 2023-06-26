const Joi = require("joi");

const columnSchema = Joi.object({
  parrentBoard: Joi.string()
    .required()
    .length(24)
    .messages({ "any.required": "missing required parrentBoard id" }),
});

module.exports = columnSchema;
