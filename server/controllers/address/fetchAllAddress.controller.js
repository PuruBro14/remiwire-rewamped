const AddressModel = require("../../models/Address.model");

exports.fetchAllAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('userId',userId);

    const userAddress = await AddressModel.find({ userId: userId }).sort({
      createdAt: -1,
    });

    console.log("userAddress", userAddress);

    res.status(200).json({
      success: true,
      data: userAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user address",
      error: error.message,
    });
  }
};
