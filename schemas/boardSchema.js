const Joi = require('joi');

const addBoardSchema = Joi.object({
  title: Joi.string(),
  currentBg: Joi.string(),
  icon: Joi.string()
    .valid(
      'icon-hexagon-01',
      'icon-Project',
      'icon-lightning-02',
      'icon-loading-03',
      'icon-star-04',
      'icon-puzzle-piece-02',
      'icon-container',
      'icon-colors'
    )
    .messages({
      'any.only':
        "Can be only 'icon-hexagon-01', 'icon-Project', 'icon-lightning-02', 'icon-loading-03', 'icon-star-04', 'icon-puzzle-piece-02', 'icon-container', 'icon-colors'",
    }),
});

const editBoardSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'missing required Board title' }),
  currentBg: Joi.string(),
  icon: Joi.string()
    .required()
    .valid(
      'icon-hexagon-01',
      'icon-Project',
      'icon-lightning-02',
      'icon-loading-03',
      'icon-star-04',
      'icon-puzzle-piece-02',
      'icon-container',
      'icon-colors'
    )
    .messages({
      'any.required': 'missing field icon',
      'any.only':
        "Can be only 'icon-hexagon-01', 'icon-Project', 'icon-lightning-02', 'icon-loading-03', 'icon-star-04', 'icon-puzzle-piece-02', 'icon-container', 'icon-colors'",
    }),
});

const boardSchemas = {
  addBoardSchema,
  editBoardSchema,
};

module.exports = boardSchemas;
