const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const taskSchema = new Schema(
  {
    title: {
      type: String,
      default: 'New Task',
      required: true,
    },
    parentColumn: {
      type: Schema.Types.ObjectId,
      ref: 'column',
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    priority: {
      type: String,
      enum: ['without', 'low', 'medium', 'high'],
      default: 'medium',
    },
    deadline: {
      type: String,
      match: /^\d{2}-\d{2}-\d{4}$/,
      default: null,
    },
  },
  { versionKey: false }
);

taskSchema.post('save', handleMongooseError);

const Task = model('task', taskSchema);

module.exports = Task;
