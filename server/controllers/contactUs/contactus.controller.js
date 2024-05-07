const joi = require("joi");
const mailSender = require("../../utils/mailSender");
const contactUsTemplate = require("../../views/contact_us");

const contactUsSchema = joi.object().keys({
  //   name: joi.string().min(2).max(100).required(),
  email: joi.string().email().required().lowercase(),
  message: joi.string().required(),
});

exports.contactUsTemplate = async (req, res) => {
  const { error, value } = contactUsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }
  try {
    let contactTemplates = await contactUsTemplate(
      value.email,
      "sd",
      value.message
    );
    await mailSender(
      value.email,
      "Thankyou for contacting us.",
      contactTemplates
    );
    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.log("sending email error: " + error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error.`,
      data: null,
    });
  }
};
