const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      default: "New Board",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "board",
    },
  },
  { versionKey: false }
);

columnSchema.post("save", handleMongooseError);

const Column = model("board", columnSchema);

module.exports = Column;
