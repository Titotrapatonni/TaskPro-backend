const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
