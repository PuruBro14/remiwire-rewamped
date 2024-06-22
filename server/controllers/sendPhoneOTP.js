const twilio = require("twilio");
const accountSid = "AC449cc28f34818c0b497ab36ad7af6c6b";
const authToken = "06112bc41995a3d092526ae09169224a";  
const client = new twilio(accountSid, authToken);

const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber[0] !== "+") {
    return "+" + phoneNumber;
  }
  return phoneNumber;
};

exports.sendPhoneOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  console.log(phoneNumber);
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  console.log("format", formattedPhoneNumber);
  try {
    const verification = await client.verify.v2
      .services("VAdc6cffe5a61b3e215da980f85445631f")
      .verifications.create({ to: formattedPhoneNumber, channel: "sms" });

    res.status(200).send({
      success: true,
      message: "OTP sent successfully",
      verification,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to send OTP", error });
  }
};

exports.verifyPhoneOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const verificationCheck = await client.verify.v2
      .services("VAdc6cffe5a61b3e215da980f85445631f")
      .verificationChecks.create({ to: phoneNumber, code: otp });

    console.log("verficaitionCheck", verificationCheck);

    if (verificationCheck.status === "approved") {
      return res
        .status(200)
        .json({ success: true, message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
};
