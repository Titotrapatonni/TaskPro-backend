const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      default: "New Board",
    },
    currentBg: { type: Number, default: null },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

module.exports = Board;
