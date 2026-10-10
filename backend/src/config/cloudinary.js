import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudinary = async (filePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });

    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
    });
    // console.log("resume file : ",result)
    await fs.unlink(filePath);
    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    throw error;
  }
};

export default uploadOnCloudinary;
