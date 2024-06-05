const Profile=require("../models/Profile");
const User=require("../models/User");
const bcrypt = require("bcryptjs");
const mailSender=require("../utils/mailSender")

exports.updateProfile = async (req, res) => {
  try {
    const {
      gender = "",
      dateOfBirth = "",
      about,
      contactNumber,
      firstName,
      lastName,
    } = req.body;
    const id = req.user.id;

    const userDetails = await User.findById(id);

    if (firstName) userDetails.firstName = firstName;
    if (lastName) userDetails.lastName = lastName;

    await userDetails.save();

    const profile = await Profile.findById(userDetails.additionalDetails);
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    await profile.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: userDetails,
      profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.fetchUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select("-password"); 

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, profile: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.deleteAccount=async(req,res)=>{
    try{
        const user=await User.findById({_id:req.user.id})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User deleted successfully"
            })
        }

        await Profile.findByIdAndDelete({_id:user.additionalDetails})

        res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted successfully"
        })
    }
}

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);

    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Check if the old password matches
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The current password is incorrect",
      });
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    // Encrypt the new password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send a confirmation email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password Update",
        "Your password has been updated successfully"
      );
    } catch (error) {
      console.log("Error occurred while sending mail", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending mail",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: err.message,
    });
  }
};