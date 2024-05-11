const adminOverseaUserTemplate = require("../mail/templates/adminOverseaEnqiuryTemplate");
const userSeaTemplate = require("../mail/templates/userOverseaTemplate");
const BlockedAccount = require("../models/blockedAccount");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createBlockedAccount = async (req, res) => {
  try {
    // const userId = req.user.id;

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

    const newBlockedAccount = await BlockedAccount.create({
      userId,
      transferFromCountry,
      transferFromState,
      transferFromCity,
      transferToCountry,
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

     let adminTemplate = await adminOverseaUserTemplate(value);
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
      data: newBlockedAccount,
      message: "Blocked Account Created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Blocked Account",
      error: err.message,
    });
  }
};
