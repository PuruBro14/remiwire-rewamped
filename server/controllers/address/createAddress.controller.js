const AddressModel = require("../../models/Address.model");
const User = require("../../models/User");
const Joi = require("joi");

const addressValidation = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  locality: Joi.string().required(),
  landmark: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  zipcode: Joi.string().required(),
  phone: Joi.string().required(),
});

exports.createAddress = async (req, res) => {
  const userId = req.user.id;
  const { error, value } = addressValidation.validate(req.body);
  if (error) {
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
      locality: value.locality,
      landmark: value.landmark,
      state: value.state,
      country: value.country,
      zipcode: value.zipcode,
      phone: value.phone,
      userId: userId,
    });

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.address.push(createAddress._id);
    await user.save();

    const populatedUser = await User.findById(userId).populate("address");

    return res.status(201).json({
      success: true,
      message: "Address successfully added.",
      data: populatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
