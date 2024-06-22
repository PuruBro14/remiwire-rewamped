const express = require("express");
const addressRouter = express.Router();
const AddressController = require("../controllers/address/index");
const { auth } = require("../middlewares/auth");

addressRouter.post(
  "/createAddress",
  auth,
  AddressController.createAddress
);
addressRouter.get(
  "/fetchUserAddress",
  auth,
  AddressController.fetchAllAddress
);
addressRouter.get(
  "/fetchAddress/:addressId",
  AddressController.fetchAddressById
);
addressRouter.put(
  "/updateAddress/:id",
  auth,
  AddressController.updateAddressById
);
addressRouter.delete(
  "/deleteAddress/:id",
  auth,
  AddressController.deleteAddressById
);

module.exports = addressRouter;
