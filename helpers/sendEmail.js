const nodemailer = require('nodemailer');

const { META_PASSWORD, META_EMAIL } = process.env;

const configOptions = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(configOptions);

const sendEmail = async data => {
  const email = { ...data, from: META_EMAIL };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
