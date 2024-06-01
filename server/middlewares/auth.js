const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Received token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      req.user = decoded;
      next();
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (err) {
    console.error("Error in auth middleware:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
