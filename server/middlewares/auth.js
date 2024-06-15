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

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    console.log('token',token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

exports.adminAuth = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    const authToken = authHeader.split(" ")[1];

    if (!authToken) {
      return res.status(401).json({
        success: false,
        message: "authToken is missing",
      });
    }

    console.log("authToken", authToken);

    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (err) {
      console.error("authToken verification failed:", err.message);
      return res.status(401).json({
        success: false,
        message: "authToken is invalid",
      });
    }
  } catch (err) {
    console.error("Error in auth middleware:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the authToken",
    });
  }
};

exports.isAdmin=(req, res)=>{
  const role = req.user?.accountType;
  if (role.toLowerCase() !== "admin") {
    return res.status(401).json({
      message: "Unauthorized Access",
      error: "You are not authorized to access this route",
    });
  }
  next();
}

