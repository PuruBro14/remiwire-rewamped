const express = require("express");
const addressRouter = express.Router();
const AddressController = require("../controllers/address/index");
const SecureAuth = require("../middleware/jwtVerify");

addressRouter.post(
  "/createAddress",
  SecureAuth,
  AddressController.createAddress
);
addressRouter.get(
  "/fetchAllAddress",
  SecureAuth,
  AddressController.fetchAllAddress
);
addressRouter.get(
  "/fetchAddress/:addressId",
  AddressController.fetchAddressById
);
addressRouter.put(
  "/updateAddress/:id",
  SecureAuth,
  AddressController.updateAddressById
);
addressRouter.delete(
  "/deleteAddress/:id",
  SecureAuth,
  AddressController.deleteAddressById
);

module.exports = addressRouter;
