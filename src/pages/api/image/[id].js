import cloudinary from "cloudinary";
import base from "@/utils/base";
import asyncHandler from "express-async-handler";
const handler = base().delete(
   asyncHandler(async (req, res) => {
      const { id } = req.query;

      cloudinary.config({
         cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
         api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
         api_secret: process.env.CLOUDINARY_SECRET,
      });

      cloudinary.v2.uploader.destroy(
         id,
         { resource_type: "image" },
         function (error, result) {
            res.json(result, error);
         }
      );
   })
);

export default handler;
