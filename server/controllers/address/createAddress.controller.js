const AddressModel = require("../../models/Address.model");
const Joi = require("joi");

const addressValidation = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  landmark: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  zipcode: Joi.number().required(),
  phone: Joi.number().required(),
});

exports.createAddress = async (req, res) => {
  const userId = req.user.id;
  const { error, value } = addressValidation.validate(req.body);
  if (error) {
    let allDetails = error.details.map((item) => item.message);
    return res.status(400).json({
      success: false,

      message: error.details[0].message,
    });
  }
  try {
    let createAddress = await AddressModel.create({
      fullName: value.fullName,
      address: value.address,
      city: value.city,
      landmark: value.landmark,
      state: value.state,
      country: value.country,
      zipcode: value.zipcode,
      phone: value.phone,
      userId: userId,
    });
    return res.status(201).json({
      success: true,
      message: "Address successfully added.",
      data: createAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error.`,
      error: error.message,
    });
  }
};
