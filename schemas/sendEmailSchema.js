const Joi = require("joi");

const sendEmailSchema = Joi.object({
  replyEmail: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required replyEmail field" }),
  comment: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({ "any.required": "missing required comment field" }),
});

module.exports = sendEmailSchema;
