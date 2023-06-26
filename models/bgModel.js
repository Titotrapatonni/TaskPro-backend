const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const backgroundSchema = new Schema(
  {
    desktopURL: {
      type: String,
      required: [true, "desktopURL is required"],
    },
    retinaURL: {
      type: String,
      required: [true, "retinaURL is required"],
    },
    tabletURL: {
      type: String,
      required: [true, " tabletURL is required"],
    },
    mobileURL: {
      type: String,
      required: [true, "mobileURL is required"],
    },
  },
  { versionKey: false }
);

backgroundSchema.post("save", handleMongooseError);

const Background = model("background", backgroundSchema);

module.exports = Background;
