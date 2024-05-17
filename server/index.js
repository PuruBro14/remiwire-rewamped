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

app.post("/payment", async (req, res) => {
  try {
    const options = {
      method: "POST",
      url: "https://sandbox.cashfree.com/pg/orders",
      headers: {
        accept: "application/json",
        "x-api-version": process.env.API_VERSION,
        "content-type": "application/json",
        "x-client-id": process.env.CLIENT_ID,
        "x-client-secret": process.env.CLIENT_SECRET,
      },
      data: {
        customer_details: {
          customer_id: "CID89898" + Date.now(),
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
        order_id: "TORID665456" + Date.now(),
        order_currency: "INR",
        order_note: "Remiwire order",
      },
    };
    const response = await axios.request(options);
    console.log(response.data);
    return res.status(200).send(response.data);
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
    const client_id = process.env.CLIENT_ID;
    const client_secret =
      process.env.CLIENT_SECRET;
  try {
    const remitterData = {
      remitter_id: "rem_09",
      purpose: "EDUCATION",
      account_number: "011234567990",
      ifsc: "SBIN0005943",
      pan: "ABCDE1234F",
      name: "Siddharth",
      address: "ABC street",
      phone_number: "9090909090",
      email: "abc@b.com",
      nationality: "IN",
      postal_code: "474005",
      state: "madhya pradesh",
      city: "gwalior",
      bank_code: "3003",
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
  const client_id = process.env.CLIENT_ID;
  const client_secret =
    process.env.CLIENT_SECRET;
  try {
    const beneficiaryData = 
      {"beneficiary_id":"bene_002","account_holder_name":"Harward University","account_number":"13719713158835300","swift_code":"SVBKUS6S","iban":"ABCDEFGHIJ123458923","bank_name":"Silicon Valley Bank","bank_country":"US","bank_address":"003 Tasman Drive, Santa Clar","address":"Harvard University","city":"Cambridge","state":"Massachusetts","country":"US","postal_code":"021384","routing_number":"121140399"}
    

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
  const client_secret =
    process.env.CLIENT_SECRET;
  console.log("runned");
  const orderid = req.params.orderid;
  console.log("orderid", orderid);

  console.log('line 176');
  try {
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

    console.log('line 187');

    axios
      .request(options)
      .then(function (response) {
        console.log('response----------->',response.data,'order_status',response.data.order_status);
        if (response.data.order_status === "PAID") {
          console.log('success');
        } else if (response.data.order_status === "ACTIVE") {
          console.log('redicrect');
        } else {
          console.log('failed');
        }
      })
      .catch(function (error) {
        return console.error('error------>',error);
      });
  } catch (error) {
    return console.error(error);
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

