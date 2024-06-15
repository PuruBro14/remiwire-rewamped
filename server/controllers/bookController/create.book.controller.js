const BookModel = require("../../models/bookOrder.model");
const { ordervalidation } = require("../../utils/validation");
const { v4: uuidv4 } = require("uuid");

exports.createBookOrders = async (req, res) => {
  const { error, value } = ordervalidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const userId = req.user.id;
    const customerId = req.body.customerId;


    const orderId = uuidv4(); // Generate orderId here

    const createOrder = await BookModel.create({
      orderId: orderId,
      customerId: customerId,
      currencies: value.currencyData.map((data) => ({
        amount: data.amount,
        from: data.from,
        to: data.to,
        currentRate: data.currentRate,
      })),
      userId: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Order Successfully Added.",
      data: createOrder,
    });
  } catch (error) {
    console.log("::===> internal ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
