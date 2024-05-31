const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const ordersRoutes = require("./routes/bookOrder.routes");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const addressRouter = require("./routes/address.routes");
const contactRouter = require("./routes/contact_us.routes");
const profileRoutes = require("./routes/Profile");
const paymentRoutes=require("./routes/paymentRoutes")
const orderRoutes = require("./routes/orderRoutes");
const documentRoutes = require("./routes/documentRoutes");
const fxRateRoutes = require("./routes/fxRateRoutes");
const remitterRoutes = require("./routes/remitterRoutes");
const beneficiaryRoutes = require("./routes/beneficiaryRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const statusRoutes = require("./routes/statusRoutes");
const NRIRepatriationRoutes = require("./routes/nriRepatriatoin");
const sendMoneyRoutes = require("./routes/sendMoney");
const blockedAccountRoutes = require("./routes/blockedAccount");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
// const overSeaLoanRoutes = require("./overseaEducationLoan.routes");
const {Cashfree}=require('cashfree-pg');
const crypto = require("crypto");
const axios=require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const Order = require("./models/Order");

require('dotenv').config();
const PORT = process.env.PORT || 4000;

database.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

//cloudinary connection
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", ordersRoutes);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1", contactRouter);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1", NRIRepatriationRoutes);
app.use("/api/v1", sendMoneyRoutes);
app.use("/api/v1", blockedAccountRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", documentRoutes);
app.use("/api/v1", fxRateRoutes);
app.use("/api/v1", remitterRoutes);
app.use("/api/v1", beneficiaryRoutes);
app.use("/api/v1", verificationRoutes);
app.use("/api/v1", statusRoutes);

function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");

  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);

  const orderId = hash.digest("hex");

  return orderId.substring(0, 12);
}

app.get("/", (req, res) => {
  console.log("this is running");
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

