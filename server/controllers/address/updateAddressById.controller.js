const AddressModel = require("../../models/Address.model");
const mongoose = require("mongoose");

exports.updateAddressById = async (req, res) => {
  let addressId = req.params.id;
  let updateFields = req.body;
  if (addressId === undefined) {
    return res.status(400).json({
      success: false,
      message: `Please provide address id.`,
    });
  }

  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    return res.status(400).json({
      success: false,
      message: `Please provide valid address id.`,
    });
  }

  try {
    let fetchAddress = await AddressModel.findByIdAndUpdate(
      addressId,
      updateFields,
      { new: true }
    );
    if (!fetchAddress) {
      return res.status(200).json({
        success: false,
        message: `No address details found.`,
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Update address successfully.",
      data: fetchAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error.`,
      error: error.message,
    });
  }
};
