const BookModel = require("../../models/bookOrder.model");

exports.getAllOrders = async (req, res) => {
  try {
    let allOrders = await BookModel.find({})
      .populate("userId") 
    if (allOrders.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No orders found.`,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `All Orders details fetched.`,
      data: allOrders
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error.`,
    });
  }
};
