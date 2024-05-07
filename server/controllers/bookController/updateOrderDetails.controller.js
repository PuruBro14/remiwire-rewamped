const BookModel = require("../../models/bookOrder.model");

exports.updateOrderDetails = async (req, res) => {
  let orderId = req.params.id;

  if (orderId === undefined) {
    return res.status(400).json({
      success: false,
      message: `Please provide order id.`,
    });
  }
  try {
    let orderdetails = await BookModel.findByIdAndUpdate(
      orderId,
      {
        amount: req.body.amount,
        from: req.body.from,
        to: req.body.to,
        currentRate: req.body.currentRate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!orderdetails) {
      return res.status(400).json({
        success: false,
        message: `No orders found.`,
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: `Order details updated successfully.`,
      data: orderdetails,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error.`,
    });
  }
};
