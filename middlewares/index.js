const authenticate = require('./authenticate');
const validateBody = require('./validateBody');
const uploader = require('./uploader');
const isValidId = require('./isValidId');
const passport = require('./google-authenticate');

module.exports = {
  authenticate,
  validateBody,
  uploader,
  isValidId,
  passport,
};
