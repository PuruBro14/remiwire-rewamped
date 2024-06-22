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
const phoneOTPRoutes=require('./routes/phoneOTPRoutes')
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const {Cashfree}=require('cashfree-pg');
const jwt = require("jsonwebtoken");
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
app.use("/api/v1",phoneOTPRoutes)

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

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

