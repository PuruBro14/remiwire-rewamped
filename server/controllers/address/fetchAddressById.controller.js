const AddressModel = require("../../models/Address.model");
const mongoose = require("mongoose");

exports.fetchAddressById = async (req, res) => {
  let addressId = req.params.addressId;
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
    let fetchAddress = await AddressModel.findOne({ _id: addressId }).populate(
      "userId",
      "username, email"
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
      message: "All Address successfully fetched.",
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
