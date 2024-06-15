const adminOverseaUserTemplate = require("../mail/templates/adminOverseaEnqiuryTemplate");
const userSeaTemplate = require("../mail/templates/userOverseaTemplate");
const SendMoney = require("../models/SendMoney");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mailSender = require("../utils/mailSender");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSendMoney = async (req, res) => {
  try {
    const userId = req.user.id;

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
      passportNumber,
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

    const { pancardImage, passportImage } = req.files;

    const requiredFields = [
      pancardImage,
      passportImage
    ];


    console.log(transferFromCountry,pancardImage);
    const missingFields = requiredFields.filter((field) => !field);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
        missingFields,
      });
    }

        const panImage = await uploadImageToCloudinary(
          pancardImage,
          process.env.FOLDER_NAME
        );
    const passportImg = await uploadImageToCloudinary(
      passportImage,
      process.env.FOLDER_NAME
    );

    const newSendMoney = await SendMoney.create({
      userId,
      pancardImage: panImage.url,
      passportImage: passportImg.url,
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
