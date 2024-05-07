const { createAddress } = require("./createAddress.controller");
const { deleteAddressById } = require("./deleteAddressById.controller");
const { fetchAddressById } = require("./fetchAddressById.controller");
const { fetchAllAddress } = require("./fetchAllAddress.controller");
const { updateAddressById } = require("./updateAddressById.controller");

module.exports = {
  createAddress,
  fetchAllAddress,
  fetchAddressById,
  updateAddressById,
  deleteAddressById,
};
