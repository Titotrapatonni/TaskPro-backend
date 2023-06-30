const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const boardSchema = new Schema(
  {
    title: {
      type: String,
      default: 'New Board',
    },
    currentBg: { type: String, default: '' },
    icon: {
      type: String,
      enum: [
        'icon-hexagon-01',
        'icon-Project',
        'icon-lightning-02',
        'icon-loading-03',
        'icon-star-04',
        'icon-puzzle-piece-02',
        'icon-container',
        'icon-colors',
      ],
      default: 'icon-hexagon-01',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Owner is required'],
    },
  },
  { versionKey: false }
);

boardSchema.post('save', handleMongooseError);

const Board = model('board', boardSchema);

module.exports = Board;
