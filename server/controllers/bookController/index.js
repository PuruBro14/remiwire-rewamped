const { createBookOrders } = require("./create.book.controller");
const { deleteOrderDetails } = require("./deleteOrderDetails.controller");
const { getAllOrders } = require("./getAllBookOrders.controller");
const { getOrderDetailsById } = require("./getOrderDetailsById.controller");
const { updateOrderDetails } = require("./updateOrderDetails.controller");

module.exports = {
  createBookOrders,
  getAllOrders,
  getOrderDetailsById,
  updateOrderDetails,
  deleteOrderDetails,
};
