const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      default: "New Column",
    },
    parentBoard: {
      type: Schema.Types.ObjectId,
      ref: "board",
    },
    board: { type: Schema.Types.ObjectId, ref: "board" },
  },
  { versionKey: false }
);

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

module.exports = Column;
