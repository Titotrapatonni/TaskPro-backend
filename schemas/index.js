const registerSchema = require("./registerSchema");
const loginSchema = require("./loginSchema");
const sendEmailSchema = require("./sendEmailSchema");
const updateThemeSchema = require("./updateThemeSchema");
const updateProfileSchema = require("./updateProfileSchema");
const boardSchemas = require("./boardSchema");
const columnSchema = require("./columnSchema");
const taskSchema = require("./taskSchema");

module.exports = {
  registerSchema,
  loginSchema,
  sendEmailSchema,
  updateThemeSchema,
  updateProfileSchema,
  boardSchemas,
  columnSchema,
  taskSchema,
};
