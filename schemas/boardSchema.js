const Joi = require('joi');

const addBoardSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'missing required Board title' }),
  currentBg: Joi.number(),
  icon: Joi.string().optional(),
});

const editBoardSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'missing required Board title' }),
  currentBg: Joi.number(),
  icon: Joi.string().optional(),
});

const boardSchemas = {
  addBoardSchema,
  editBoardSchema,
};

module.exports = boardSchemas;
