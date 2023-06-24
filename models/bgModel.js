const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const bgSchema = new Schema(
  {
    desktopURL: {
      type: String,
      default:
        "https://res.cloudinary.com/duvou6od6/image/upload/v1685968257/647a2061cd59e2bc6ce192e3.png",
    },
    tabletURL: {
      type: String,
      default:
        "https://res.cloudinary.com/duvou6od6/image/upload/v1685961103/cld-sample-3.jpg",
    },
    mobileURL: {
      type: String,
      default:
        "https://res.cloudinary.com/duvou6od6/image/upload/v1685961104/cld-sample-4.jpg",
    },
  },
  { versionKey: false }
);

bgSchema.post("save", handleMongooseError);

const Background = model("backgrounds", bgSchema);

module.exports = Background;
