const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] } })
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    // .pattern(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-=_+{}\[\]|\\;:'",.<>/?]{8,64}$/
    // )
    .messages({ "any.required": "missing required password field" }),
});

module.exports = loginSchema;
