const AddressModel = require("../../models/Address.model");

exports.fetchAllAddress = async (req, res) => {
  const userId = req.user.id;

  try {
    let fetchAddress = await AddressModel.find({}).populate(
      "userId",
      "username, email"
    );
    if (fetchAddress.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No address found.`,
        data: [],
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
