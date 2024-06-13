const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";

    const uploadedImage = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );
    console.log('image uploaded on cloudinary');
    return uploadedImage;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
