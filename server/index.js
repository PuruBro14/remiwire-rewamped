const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const ordersRoutes = require("./routes/bookOrder.routes");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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
const adminRoutes = require("./routes/adminRoutes");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const {Cashfree}=require('cashfree-pg');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const twilio = require("twilio");
const accountSid = "AC449cc28f34818c0b497ab36ad7af6c6b";
const authToken = "06112bc41995a3d092526ae09169224a";  
const client = new twilio(accountSid, authToken);

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

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", ordersRoutes); 
app.use("/api/v1/address", addressRouter);
app.use("/api/v1", contactRouter);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1", NRIRepatriationRoutes);
app.use("/api/v1", sendMoneyRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", fxRateRoutes);
app.use("/api/v1", remitterRoutes);
app.use("/api/v1", documentRoutes);
app.use("/api/v1", beneficiaryRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", verificationRoutes);
app.use("/api/v1", statusRoutes);
app.use("/api/v1", adminRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and runningggggg....",
  });
});

const adminUser = {
  username: "admin",
  password: "Admin@123", 
};

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username || password !== adminUser.password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign(
    { username: adminUser.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  res.json({ token, role: "admin" });
});

const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber[0] !== "+") {
    return "+" + phoneNumber;
  }
  return phoneNumber;
};

app.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;
  console.log(phoneNumber);
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  console.log("format", formattedPhoneNumber);
  try {
    
     const verification = await client.verify.v2
       .services("VAdc6cffe5a61b3e215da980f85445631f")
       .verifications.create({ to: formattedPhoneNumber, channel: "sms" });

     res
       .status(200)
       .send({ success: true, message: "OTP sent successfully", verification });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to send OTP", error });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const verificationCheck = await client.verify.v2
      .services("VAdc6cffe5a61b3e215da980f85445631f")
      .verificationChecks.create({ to: phoneNumber, code: otp });

      console.log('verficaitionCheck',verificationCheck);

    if (verificationCheck.status === "approved") {
      return res
        .status(200)
        .json({ success: true, message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to verify OTP",
        error: error.message,
      });
  }
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

