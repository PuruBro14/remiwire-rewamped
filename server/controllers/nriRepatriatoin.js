const adminOverseaUserTemplate = require("../mail/templates/adminOverseaEnqiuryTemplate");
const userSeaTemplate = require("../mail/templates/userOverseaTemplate");
const NRIRepatriation = require("../models/nriRepatriation");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mailSender = require("../utils/mailSender");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createNRIRepatriation = async (req, res) => {
  try {
    let {
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

    if (
      !transferFromCountry ||
      !transferToCountry ||
      !purposeOfTransfer ||
      !receivingCurrency ||
      !receivingAmountInEuro ||
      !pancardNumber ||
      !pancardImage ||
      !passportNumber ||
      !passportImage ||
      !blockACSheetDoc ||
      !remiterFirstName ||
      !remiterLastName ||
      !remiterAccountNo ||
      !remiterIFSCCode ||
      !remiterEmailID ||
      !remiterMobileNo ||
      !beneficiaryName ||
      !beneficiaryAddress ||
      !beneficiaryAccountNo ||
      !beneficiaryAccountNoRe ||
      !beneficiarySwiftCode ||
      !beneficiaryIBANNo ||
      !beneficiaryCountry
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
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

    const newNRIRepatriation = await NRIRepatriation.create({
      transferDetails: {
        transferFromCountry,
        transferFromState,
        transferFromCity,
        transferToCountry,
      },
      purposeOfTransfer,
      currencyDetails: {
        receivingCurrency,
        sendingCurrencyIn: sendingCurrencyIn || "INR",
      },
      amountDetails: {
        receivingAmountInEuro,
        receivingAmountInINR,
        oneEurotoINR,
      },
      identificationDetails: {
        pancardNumber,
        pancardImage: panImage.url,
        passportNumber,
        passportImage: passportImg.url,
        blockACSheetDoc,
      },
      remitterDetails: {
        remiterFirstName,
        remiterLastName,
        remiterAccountNo,
        remiterIFSCCode,
        remiterEmailID,
        remiterMobileNo,
      },
      beneficiaryDetails: {
        beneficiaryName,
        beneficiaryAddress,
        beneficiaryAccountNo,
        beneficiaryAccountNoRe,
        beneficiarySwiftCode,
        beneficiaryIBANNo,
        beneficiaryCountry,
      },
    });

     let adminTemplate = await adminOverseaUserTemplate(req.body);
     let usersTemplates = await userSeaTemplate();

     await mailSender(
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
      data: newNRIRepatriation,
      message: "NRI Repatriation Created Successfully",
    });
  } catch (err) {
    console.log("failed controller 4 ");
    return res.status(500).json({
      success: false,
      message: "Failed to create NRI Repatriation",
      error: err.message,
    });
  }
};
