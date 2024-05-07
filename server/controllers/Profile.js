const Profile=require("../models/Profile");
const User=require("../models/User");
const bcrypt = require("bcrypt");
const mailSender=require("../utils/mailSender")
exports.updateProfile=async(req,res)=>{
    try{
        const{dateOfBirth="",contactNumber}=req.body;

        const id=req.user.id;

        const userDetails=await User.findById(id)

        const profile=await Profile.findById(userDetails.additionalDetails);

        profile.dateOfBirth=dateOfBirth;
        profile.contactNumber=contactNumber;

        await profile.save();

        return res.json({
            success:true,
            message:"Profile updated successfully",
            profile
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

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

exports.changePassword=async(req,res)=>{
    try{
        const userDetails=await User.findById(req.user.id);

        const {oldPassword,newPassword,confirmNewPassword}=req.body;

        const isPasswordMatch=await bcrypt.compare(
            oldPassword,
            userDetails.password
        )

        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:'The password is incorrect'
            })
        }

        if(newPassword!==confirmNewPassword){
            return res.status(401).json({
              success: false,
              message: "The password and confirm password does not match",
            });
        }

        const encryptedPassword=await bcrypt.hash(newPassword,10);

        const updatedUserDetails=await User.findByIdAndUpdate(
            req.user.id,
            {password:encryptedPassword},
            {new:true}
        )

        try{
            const emailResponse=await mailSender(
                updatedUserDetails.email,
                "Password Update",
                "Password updated successfully"
            )
        }catch(error){
            console.log("Error occured while sending mail",error);

            return res.status(500).json({
                success:false,
                message:"Error occured while sending mail",
                error:error.message
            })
        }

        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occured while updating password",
            error:err.message
        })
    }
}