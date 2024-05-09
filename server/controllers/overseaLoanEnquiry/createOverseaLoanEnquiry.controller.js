// // const LoanEnquiryModel = require("../../models/overseas_loan_enquiry.model");
// const mailSender = require("../../utils/mailSender");
// const { overseasLoanEnquiryValidation } = require("../../utils/validation");
// const adminOverseaUserTemplate = require("../../mail/templates/adminOverseaEnqiuryTemplate");
// const userSeaTemplate = require("../../mail/templates/userOverseaTemplate");

// exports.createOverseaLoanEnquiry = async (req, res) => {
//   const { error, value } = overseasLoanEnquiryValidation.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.details[0].message,
//       data: null,
//     });
//   }
//   const {
//     firstName,
//     lastName,
//     email,
//     mobileNumber,
//     studyCountry,
//     instituteName,
//     courseDetails,
//     parentName,
//     parentMobile,
//   } = value;
//   try {
//     let createNewdata = await LoanEnquiryModel({
//       firstName,
//       lastName,
//       email,
//       mobileNumber,
//       studyCountry,
//       instituteName,
//       courseDetails,
//       parentName,
//       parentMobile,
//     });

//     await createNewdata.save();

//     let adminTemplate = await adminOverseaUserTemplate(value);
//     let usersTemplates = await userSeaTemplate();

//     await mailSender(
//       "purusharma1405@gmail.com",
//       "Users Rise requested.",
//       adminTemplate
//     );
//     await mailSender(
//       "purusharma1405@gmail.com",
//       "Thankyou for reaching out.",
//       usersTemplates
//     );
//     return res.status(200).json({
//       success: true,
//       message: `All Orders details fetched.`,
//       //   data: allOrders,
//     });
//   } catch (error) {
//     console.log("sadsadas=> ", error.message);
//     return res.status(500).json({
//       success: false,
//       message: `Internal Server Error.`,
//     });
//   }
// };
