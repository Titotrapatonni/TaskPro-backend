const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] } })
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password field" }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = registerSchema;
