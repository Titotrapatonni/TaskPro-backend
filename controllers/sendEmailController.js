const { controllerWrapper } = require("../decorators");
const { sendEmail } = require("../helpers");

const { SUPPORT_EMAIL } = process.env;

const sendEmailMessage = async (req, res, next) => {
  const { replyEmail, comment } = req.body;
  const { email: userEmail } = req.user;

  const verifyEmail = {
    to: SUPPORT_EMAIL,
    subject: `From ${userEmail}`,
    html: `
            <div>
                <h1 style="color: red; text-align: center;">${userEmail} need help!</h1>
                <p style="font-size: 16px;">${comment}</p>
                <hr style="border-color: blue;">
                <p style="font-style: italic;">reply to address ${replyEmail} please</p>
            </div>
        `,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Email sent",
  });
};

module.exports = {
  sendEmailMessage: controllerWrapper(sendEmailMessage),
};
