const Joi = require("joi");

const ordervalidation = Joi.object({
  customerId: Joi.string().required(),
  currencyData: Joi.array()
    .items(
      Joi.object({
        amount: Joi.number().required(),
        from: Joi.string().required(),
        to: Joi.string().required(),
        currentRate: Joi.number().required(),
      })
    )
    .required(),
});

module.exports = { ordervalidation };
