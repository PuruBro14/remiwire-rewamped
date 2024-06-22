const UserModel = require("../../models/User");

exports.fetchAllAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);

    const user = await UserModel.findById(userId).populate("address");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("User with populated addresses:", user);

    res.status(200).json({
      success: true,
      data: user.address,
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
