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

app.post("/payment", async (req, res) => {
  try {
    const orderId = "TORID665456" + Date.now();
    const customerId = "CID89898" + Date.now();
    const options = {
      method: "POST",
      url: "https://sandbox.cashfree.com/pg/orders",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-client-id": process.env.CLIENT_ID,
        "x-client-secret": process.env.CLIENT_SECRET,
        "x-api-version": "2022-09-01",
      },
      data: {
        customer_details: {
          customer_id: customerId,
          customer_email: "purusharma1405@gmail.com",
          customer_phone: "7498608775",
          customer_name: "goku",
        },
        order_meta: {
          notify_url:
            "https://webhook.site/99b1bf89-@bbc-4c0d-ad03-abcd1240c321",
          payment_methods: "cc,dc,upi,nb,paylater",
        },
        order_amount: 1,
        order_id: orderId,
        order_currency: "INR",
        order_note: "Remiwire order",
      },
    };

    const response = await axios.request(options);
    console.log(response.data);

    const newOrder = new Order({
      orderId: orderId,
      customerId: customerId,
      user: "66349af8293fa499048702cb",
      orderStatus: "Paid", 
      orderDate: new Date(),
      orderAmount: 1, 
      currency: "INR", 
      paymentMethod: "Credit Card", 
      shippingAddress: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        postalCode: "62701",
        country: "USA",
      },
      billingAddress: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        postalCode: "62701",
        country: "USA",
      },
      orderNote: "Remiwire order",
    });

    await newOrder.save();

    return res.status(200).send(response.data);
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.post("/verify", async (req, res) => {
  try {
    let { orderId } = req.body;
    console.log('orderId',orderId);

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



app.post("/registerRemitter", async (req, res) => {
  console.log('req----------->',req.body);
  const{purpose,account_number,ifsc,pan,remitter_id,name,address,phone_number,email,nationality,postal_code,state,city,bank}=req.body
    const client_id = process.env.CLIENT_ID;
    const client_secret =
      process.env.CLIENT_SECRET;
  try {
    const remitterData = {
      purpose: purpose,
      account_number: account_number,
      ifsc: ifsc,
      pan: pan,
      remitter_id: remitter_id,
      name: name,
      address: address,
      phone_number: phone_number,
      email: email,
      nationality: nationality,
      postal_code: postal_code,
      state: state,
      city: city,
      bank_code: bank,
    };

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/lrs/remitters",
      remitterData,
      {
        headers: {
          "x-client-id": client_id,
          "x-client-secret": client_secret,
          "x-api-version": process.env.API_VERSION,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data); 
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the remitter." });
  }
});

app.post("/beneficiaries", async (req, res) => {
  const {
    beneficiary_id,
    account_holder_name,
    account_number,
    swift_code,
    iban,
    bank_name,
    bank_country,
    bank_address,
    address,
    city,
    state,
    country,
    postal_code,
    routing_number,
  } = req.body;

  // Check if required environment variables are set
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const api_version = process.env.API_VERSION;

  if (!client_id || !client_secret || !api_version) {
    return res.status(500).json({
      error:
        "Server configuration error: Missing required environment variables.",
    });
  }

  // Validate required fields
  if (
    !beneficiary_id ||
    !account_holder_name ||
    !account_number ||
    !bank_name ||
    !bank_country ||
    !bank_address ||
    !address ||
    !city ||
    !state ||
    !country ||
    !postal_code ||
    !routing_number
  ) {
    return res.status(400).json({
      error: "Validation error: Missing required fields.",
    });
  }

  const beneficiaryData = {
    beneficiary_id,
    account_holder_name,
    account_number,
    swift_code,
    iban,
    bank_name,
    bank_country,
    bank_address,
    address,
    city,
    state,
    country,
    postal_code,
    routing_number,
  };

  try {
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/lrs/beneficiaries",
      beneficiaryData,
      {
        headers: {
          "x-client-id": client_id,
          "x-client-secret": client_secret,
          "x-api-version": api_version,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error registering beneficiary:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the beneficiary." });
  }
});


app.get("/api/status/:orderid", async (req, res) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const orderid = req.params.orderid;

  console.log("Endpoint hit with orderid:", orderid);

  const options = {
    method: "GET",
    url: `https://sandbox.cashfree.com/pg/orders/${orderid}`,
    headers: {
      accept: "application/json",
      "x-api-version": "2022-09-01",
      "x-client-id": client_id,
      "x-client-secret": client_secret,
    },
  };

  try {
    const response = await axios.request(options);
    const orderStatus = response.data.order_status;

    console.log(
      "Response received:",
      response.data,
      "order_status:",
      orderStatus
    );

    if (orderStatus === "PAID") {
      console.log("Order status: PAID");
      res.json({ status: "success", message: "Order is paid." });
    } else if (orderStatus === "ACTIVE") {
      console.log("Order status: ACTIVE");
      res.json({
        status: "redirect",
        data:response.data,
        message: "Order is active, please redirect.",
      });
    } else {
      console.log("Order status: FAILED");
      res.json({ status: "failed", message: "Order has failed." });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the order status." });
  }
});

app.get("/remitters/:remitterID", async (req, res) => {
  const { remitterID } = req.params;
  console.log("Endpoint hit with remitterID:", remitterID);

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const options = {
    method: "GET",
    url: `https://sandbox.cashfree.com/pg/lrs/remitters/prod_cf_rem_005`,
    headers: {
      accept: "application/json",
      "x-api-version": "2022-09-01",
      "x-client-id": client_id,
      "x-client-secret": client_secret,
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Response received:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching remitter data" });
  }
});

app.post("/api/upload-document/:orderid", async (req, res) => {
  const orderId = req.params.orderid;
  console.log("orderId", orderId);

  const url = `https://sandbox.cashfree.com/pg/lrs/orders/${orderId}/documents/upload`;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const api_version = process.env.API_VERSION;
  const filePath = path.join(
    __dirname,
    "../../../Downloads/KYC_PASSPORT_STUDENT_1.pdf"
  );

  try {
    const form = new FormData();
    form.append("files", fs.createReadStream(filePath));

    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        "x-client-id": client_id,
        "x-client-secret": client_secret,
        "x-api-version": api_version,
      },
    });

    console.log("Response:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/fx-rate", async (req, res) => {
  const {
    to_amount,
    to_currency,
    purpose,
    education_loan,
    customer_declaration,
    sender_pan_number,
  } = req.body;

  // Validate required fields
  if (
    !to_amount ||
    !to_currency ||
    !purpose
  ) {
    return res.status(400).json({
      error:
        "Validation error: Missing required fields or incorrect data types.",
    });
  }

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const api_version = process.env.API_VERSION;

  if (!client_id || !client_secret || !api_version) {
    return res.status(500).json({
      error:
        "Server configuration error: Missing required environment variables.",
    });
  }

  const fxRateData = {
    to_amount,
    to_currency,
    purpose,
    education_loan,
    customer_declaration,
    pan: sender_pan_number || undefined,
  };

  try {
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/lrs/fx-rate/details",
      fxRateData,
      {
        headers: {
          "x-client-id": client_id,
          "x-client-secret": client_secret,
          "x-api-version": api_version,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching FX rate details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching FX rate details." });
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

