const AddressModel = require("../../models/Address.model");
const mongoose = require("mongoose");

exports.deleteAddressById = async (req, res) => {
  let addressId = req.params.id;
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
    let fetchAddress = await AddressModel.findByIdAndDelete(addressId);
    if (!fetchAddress) {
      return res.status(200).json({
        success: false,
        message: `No address found.`,
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Address successfully deleted.",
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
