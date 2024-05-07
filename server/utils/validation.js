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

module.exports = { bookValidation };
