const express = require("express");
const {
  registerRemitter,
  getRemitter,
} = require("../controllers/remitterController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/registerRemitter",registerRemitter);
router.get("/remitters/:remitterID", getRemitter);

module.exports = router;
