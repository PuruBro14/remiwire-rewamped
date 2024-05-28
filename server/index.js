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

let orders = []; // In-memory order storage. Replace this with a database in a real application.

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
          payment_methods: "cc,dc,upi",
        },
        order_amount: 1,
        order_id: orderId,
        order_currency: "INR",
        order_note: "Remiwire order",
      },
    };
    const response = await axios.request(options);
    console.log(response.data);

    // Store order in in-memory array
    orders.push({
      orderId: orderId,
      customerId: customerId,
      ...response.data,
    });

    return res.status(200).send(response.data);
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to list all orders
app.get("/orders", (req, res) => {
  res.status(200).json(orders);
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

  const FormData = require("form-data");
  const fs = require("fs");

app.post("/api/upload-document/:orderid", async (req, res) => {
  const orderId=req.params.orderid;
  console.log('orderId',orderId);


  const url =
    "https://sandbox.cashfree.com/pg/lrs/orders/58ac433f617f/documents/upload";
  const client_id = process.env.CLIENT_ID;
  const client_secret =
    process.env.CLIENT_SECRET;
  const api_version = process.env.API_VERSION;
  const filePath = "../../../Downloads/KYC_PASSPORT_STUDENT_1.pdf";

  const form = new FormData();
  form.append("files", fs.createReadStream(filePath));

  axios
    .post(url, form, {
      headers: {
        ...form.getHeaders(),
        "x-client-id": client_id,
        "x-client-secret": client_secret,
        "x-api-version": api_version,
      },
    })
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

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
  console.log('req-==->',req.body);
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

const client_id =
  process.env.CLIENT_ID !== undefined ? process.env.CLIENT_ID : "";
const client_secret =
  process.env.CLIENT_SECRET !== undefined ? process.env.CLIENT_SECRET : "";
  try {
    const beneficiaryData = {
      beneficiary_id: beneficiary_id,
      account_holder_name: account_holder_name,
      account_number: account_number,
      swift_code: swift_code,
      iban: iban,
      bank_name: bank_name,
      bank_country: bank_country,
      bank_address: bank_address,
      address: address,
      city: city,
      state: state,
      country: country,
      postal_code: postal_code,
      routing_number: "121140399",
    };
    

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/lrs/beneficiaries",
      beneficiaryData,
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

