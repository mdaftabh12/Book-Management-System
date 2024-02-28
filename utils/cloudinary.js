const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//==========  upload the file on cloudinary  ===========//

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: process.env.CLOUDINARY_FOLDER_NAME,
    });

    return response;
  } catch (error) {
    fs.unlink(localFilePath);
    return null;
  }
};

//==========  delete file from cloudinary  ===========//

exports.deleteFromCloudinary = async (image) => {
  try {
    const imageUrl = image;
    const imageName = imageUrl.split("/").pop().split(".")[0];
    
    const deleteImage = await cloudinary.uploader.destroy(
      `${process.env.CLOUDINARY_FOLDER_NAME}/${imageName}`,
    );
    return deleteImage ? true : false;
  } catch (error) {
    fs.unlink(image);
    return null;
  }
};
