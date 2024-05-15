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
const NRIRepatriationRoutes = require("./routes/nriRepatriatoin");
const sendMoneyRoutes = require("./routes/sendMoney");
const blockedAccountRoutes = require("./routes/blockedAccount");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
// const overSeaLoanRoutes = require("./overseaEducationLoan.routes");
const {Cashfree}=require('cashfree-pg');
const crypto = require("crypto");
const axios=require("axios");

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
// app.use("/api/v1/overseaEducationLoan", overSeaLoanRoutes);
app.use("/api/v1", NRIRepatriationRoutes);
app.use("/api/v1", sendMoneyRoutes);
app.use("/api/v1", blockedAccountRoutes);


function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");

  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);

  const orderId = hash.digest("hex");

  return orderId.substring(0, 12);
}

app.get("/payment", async (req, res) => {
  console.log("Request received for /payment");
  try {
    const request = {
      order_amount: 1.0,
      order_currency: "INR",
      order_id: await generateOrderId(),
      customer_details: {
        customer_id: "remiwire",
        customer_phone: "9589068752",
        customer_name: "goku",
        customer_email: "goku@example.com",
      },
    };

    Cashfree.PGCreateOrder("2023-08-01", request)
      .then((response) => {
        console.log("Payment creation response:", response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.error("Payment creation error:", error.response.data.message);
        res.status(500).json({ error: "Payment creation failed" });
      });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/verify", async (req, res) => {
  try {
    let { orderId } = req.body;

    Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/upload-document", async (req, res) => {
  console.log("runned");
  try {
    // Check if file was uploaded
    console.log("yaha runned");
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const document = req.files.file;

    // Make a request to Cashfree API for document upload
    const API_URL = `https://sandbox.cashfree.com/pg/lrs/orders/order_001_nkyyyg/documents/upload`;

    const formData = new FormData();
    formData.append("files", document.data);
    console.log("files", formData);

    const response = await axios.post(API_URL, formData, {
      headers: {
        "x-client-id": process.env.CLIENT_ID,
        "x-client-secret":
          process.env.SECRET_KEY, 
        "x-api-version": "2023-03-01",
      },
    });

    console.log("Response from Cashfree API:", response.data);
    res.json({
      success: true,
      message: "File uploaded and API called successfully.",
    });
  } catch (error) {
    console.error(
      "Error uploading file:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Error uploading file." });
  }
});

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

