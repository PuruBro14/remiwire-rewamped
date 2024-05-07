const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    if (!transporter) {
      throw new Error("transporter is undefined");
    }
    let info = await transporter.sendMail({
      from: "purusharma1405@gmail.com",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("info", info);
    return info;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = mailSender;
