const joi = require("joi");

const ordervalidation = joi.object({
  amount: joi.number().required(),
  from: joi.string().required(),
  to: joi.string().required(),
  currentRate: joi.number().required(),
});

const bookValidation = joi.object().keys({
  currencyData: joi.array().required().items(ordervalidation),
});

const overseasLoanEnquiryValidation = joi.object({
  firstName: joi
    .string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.base": "First name is required.",
      "string.empty": "First name not be empty.",
      "string.min": "First name should have at least {{#limit}} characters.",
      "string.max": "First name should not exceed {{#limit}} characters.",
      "string.pattern.base": "First name must only contain letters.",
    }),
  lastName: joi
    .string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.base": "Last name must be a string.",
      "string.empty": "Last name is required.",
      "string.min": "Last name should have at least {{#limit}} characters.",
      "string.max": "Last name should not exceed {{#limit}} characters.",
      "string.pattern.base": "Last name must only contain letters.",
    }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .trim()
    .required()
    .lowercase()
    .messages({
      "string.base": "Email must be a string.",
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email address.",
      "string.lowercase": "Email must be lowercase.",
    }),
  mobileNumber: joi
    .string()
    .trim()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "Mobile number must be a string.",
      "string.empty": "Mobile number is required.",
      "string.length":
        "Mobile number should be exactly {{#limit}} digits long.",
      "string.pattern.base": "Mobile number must contain only digits.",
    }),
  studyCountry: joi.string().trim().required().messages({
    "string.base": "Study country must be a string.",
    "string.empty": "Study country is required.",
  }),
  instituteName: joi.string().trim().required().messages({
    "string.base": "Institute name must be a string.",
    "string.empty": "Institute name is required.",
  }),
  courseDetails: joi.string().trim().required().messages({
    "string.base": "Course details must be a string.",
    "string.empty": "Course details are required.",
  }),
  parentName: joi
    .string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.base": "Parent name must be a string.",
      "string.empty": "Parent name is required.",
      "string.min": "Parent name should have at least {{#limit}} characters.",
      "string.max": "Parent name should not exceed {{#limit}} characters.",
      "string.pattern.base": "Parent name must only contain letters.",
    }),
  parentMobile: joi
    .string()
    .trim()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "Parent mobile number must be a string.",
      "string.empty": "Parent mobile number is required.",
      "string.length":
        "Parent mobile number should be exactly {{#limit}} digits long.",
      "string.pattern.base": "Parent mobile number must contain only digits.",
    }),
});
module.exports = { bookValidation, overseasLoanEnquiryValidation };
