const OrderModel = require("../../../models/Order");
const { formatDate } = require("../../../utils/utility");

exports.fetchAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, type = "all", search = "" } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    let matchQuery = {};

    if (type === "active") {
      matchQuery.orderStatus = "active";
    } else if (type === "inactive") {
      matchQuery.orderStatus = "inactive";
    }

    const pipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          $or: [
            { "user.firstName": { $regex: search, $options: "i" } },
            { "user.lastName": { $regex: search, $options: "i" } },
          ],
        },
      },
      { $skip: (pageNumber - 1) * limitNumber },
      { $limit: limitNumber },
    ];

    const orders = await OrderModel.aggregate(pipeline);

    const totalOrdersPipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          $or: [
            { "user.firstName": { $regex: search, $options: "i" } },
            { "user.lastName": { $regex: search, $options: "i" } },
          ],
        },
      },
      { $count: "total" },
    ];

    const totalOrdersResult = await OrderModel.aggregate(totalOrdersPipeline);
    const totalOrders =
      totalOrdersResult.length > 0 ? totalOrdersResult[0].total : 0;

    if (orders.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No orders found.`,
        data: [],
        pagination: {
          totalOrders,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalOrders / limitNumber),
        },
      });
    }

    let orderInfo = orders.map((data) => {
      return {
        _id: data._id,
        orderId: data.orderId,
        placedBy: `${data.user.firstName} ${data.user.lastName}`,
        orderType:
          data?.serviceType !== undefined ? data.serviceType : "HARDCODE",
        createdAt: formatDate(data.createdAt),
        estimatedDelivery: formatDate(data.orderDate),
        status: data.orderStatus,
      };
    });

    return res.status(200).json({
      success: true,
      message: `Orders fetched successfully.`,
      data: orderInfo,
      pagination: {
        totalOrders,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalOrders / limitNumber),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error.`,
      error: error.message,
    });
  }
};

const UserModel = require("../../../models/User");

exports.fetchAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({}, "-__v").populate(
      "additionalDetails",
    );
    return res.status(200).json({
      success: true,
      message: "All users fetched successfully.",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};



