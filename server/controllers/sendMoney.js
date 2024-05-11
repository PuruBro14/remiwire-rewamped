const adminOverseaUserTemplate = require("../mail/templates/adminOverseaEnqiuryTemplate");
const userSeaTemplate = require("../mail/templates/userOverseaTemplate");
const SendMoney = require("../models/SendMoney");
const mailSender = require("../utils/mailSender");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSendMoney = async (req, res) => {
  try {
    // const userId = req.user.id;

    const {
      transferFromCountry,
      transferFromState,
      transferFromCity,
      transferToCountry,
      purposeOfTransfer,
      receivingCurrency,
      sendingCurrencyIn,
      receivingAmountInEuro,
      receivingAmountInINR,
      oneEurotoINR,
      pancardNumber,
      pancardImage,
      passportNumber,
      // passportImage,
      blockACSheetDoc,
      remiterFirstName,
      remiterLastName,
      remiterAccountNo,
      remiterIFSCCode,
      remiterEmailID,
      remiterMobileNo,
      beneficiaryName,
      beneficiaryAddress,
      beneficiaryAccountNo,
      beneficiaryAccountNoRe,
      beneficiarySwiftCode,
      beneficiaryIBANNo,
      beneficiaryCountry,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      transferFromCountry,
      transferFromState,
      transferFromCity,
      transferToCountry,
      purposeOfTransfer,
      receivingCurrency,
      sendingCurrencyIn,
      receivingAmountInEuro,
      receivingAmountInINR,
      oneEurotoINR,
      pancardNumber,
      // pancardImage,
      passportNumber,
      // passportImage,
      blockACSheetDoc,
      remiterFirstName,
      remiterLastName,
      remiterAccountNo,
      remiterIFSCCode,
      remiterEmailID,
      remiterMobileNo,
      beneficiaryName,
      beneficiaryAddress,
      beneficiaryAccountNo,
      beneficiaryAccountNoRe,
      beneficiarySwiftCode,
      beneficiaryIBANNo,
      beneficiaryCountry,
    ];
    const missingFields = requiredFields.filter((field) => !field);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
        missingFields,
      });
    }

    // Upload images to Cloudinary
    // const panImage = await uploadImageToCloudinary(
    //   pancardImage,
    //   process.env.FOLDER_NAME
    // );
    // const passportImg = await uploadImageToCloudinary(
    //   passportImage,
    //   process.env.FOLDER_NAME
    // );

    // Create new SendMoney instance
    const newSendMoney = await SendMoney.create({
      // userId,
      transferFromCountry,
      transferFromState,
      transferFromCity,
      transferToCountry,
      purposeOfTransfer,
      receivingCurrency,
      sendingCurrencyIn,
      receivingAmountInEuro,
      receivingAmountInINR,
      oneEurotoINR,
      pancardNumber,
      // pancardImage: panImage.url,
      passportNumber,
      // passportImage: passportImg.url,
      blockACSheetDoc,
      remiterFirstName,
      remiterLastName,
      remiterAccountNo,
      remiterIFSCCode,
      remiterEmailID,
      remiterMobileNo,
      beneficiaryName,
      beneficiaryAddress,
      beneficiaryAccountNo,
      beneficiaryAccountNoRe,
      beneficiarySwiftCode,
      beneficiaryIBANNo,
      beneficiaryCountry,
    });

     let adminTemplate = await adminOverseaUserTemplate(req.body);
     let usersTemplates = await userSeaTemplate();

     await mailSender (
       "purusharma1405@gmail.com",
       "Users Rise requested.",
       adminTemplate
     );
     await mailSender(
       "purusharma1405@gmail.com",
       "Thankyou for reaching out.",
       usersTemplates
     );

    return res.status(200).json({
      success: true,
      data: newSendMoney,
      message: "Send Money details created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Send Money details",
      error: err.message,
    });
  }
};
