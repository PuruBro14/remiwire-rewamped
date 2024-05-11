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
// const overSeaLoanRoutes = require("./overseaEducationLoan.routes");

dotenv.config();
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

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", ordersRoutes);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1", contactRouter);
app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/overseaEducationLoan", overSeaLoanRoutes);
app.use("/api/v1", NRIRepatriationRoutes);
app.use("/api/v1", sendMoneyRoutes);
app.use("/api/v1", blockedAccountRoutes);



app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

/*
{
  "transferFromCountry": "India",
  "transferFromState": "Delhi",
  "transferFromCity": "New Delhi",
  "transferToCountry": "USA",
  "purposeOfTransfer": "Investment",
  "receivingCurrency": "USD",
  "sendingCurrencyIn": "INR",
  "receivingAmountInEuro": 1000,
  "receivingAmountInINR": 75000,
  "oneEurotoINR": 75,
  "pancardNumber": "ABCDE1234F",
  "passportNumber": "ABC123XYZ",
  "blockACSheetDoc": "BlockACSheet.pdf",
  "remiterFirstName": "John",
  "remiterLastName": "Doe",
  "remiterAccountNo": "1234567890",
  "remiterIFSCCode": "ABCD1234567",
  "remiterEmailID": "john.doe@example.com",
  "remiterMobileNo": "9876543210",
  "beneficiaryName": "Alice Smith",
  "beneficiaryAddress": "123 Main Street, Anytown",
  "beneficiaryAccountNo": "0987654321",
  "beneficiaryAccountNoRe": "0987654321",
  "beneficiarySwiftCode": "SWIFT123",
  "beneficiaryIBANNo": "IBAN987",
  "beneficiaryCountry": "USA"
}

*/