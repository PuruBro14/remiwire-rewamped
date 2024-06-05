const express=require("express");
const router=express.Router();
const { auth } = require("../middlewares/auth");

const {
  deleteAccount,
  updateProfile,
  changePassword,
  fetchUserProfile,
} = require("../controllers/Profile");

router.put("/updateProfile",auth,updateProfile);
router.get("/fetch-profile", auth, fetchUserProfile);
router.put("/deleteProfile",auth,deleteAccount);
router.put("/changepassword", auth, changePassword);

module.exports=router