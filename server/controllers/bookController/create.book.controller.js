const BookModel = require("../../models/bookOrder.model");
const { bookValidation } = require("../../utils/validation");

exports.createBookOrders = async (req, res) => {
  // let loginId = req.user.id;
  const { error, value } = bookValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    let createOrder = await Promise.all(
      value.currencyData.map(async (data) => {
        await BookModel.create({
          amount: data.amount,
          from: data.from,
          to: data.to,
          currentRate: data.currentRate,
        });
      })
    );

    return res.status(201).json({
      success: true,
      message: `Order Successfully Added.`,
      data: createOrder,
    });
  } catch (error) {
    console.log("::===> interla ", error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error.`,
    });
  }
};
