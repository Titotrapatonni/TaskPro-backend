const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const taskSchema = new Schema(
  {
    title: {
      type: String,
      default: 'New Task',
      required: true,
    },
    parrentColumn: {
      type: Schema.Types.ObjectId,
      ref: 'column',
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    priority: {
      type: String,
      enum: ['without', 'low', 'medium', 'high'],
      default: 'medium',
    },
    deadline: {
      type: String,
      match: /^\d{2}-\d{2}-\d{4}$/,
    },
    // column: { type: Schema.Types.ObjectId, ref: "column" },
  },
  { versionKey: false }
);

taskSchema.post('save', handleMongooseError);

const Task = model('task', taskSchema);

module.exports = Task;
