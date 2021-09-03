import cloudinary from "cloudinary";
import base from "@/utils/base";

const handler = base().get(async (_req, res) => {
   // TODO: CHECK TO MAKE SURE AUTHENTICATED

   // Get the timestamp in seconds
   const timestamp = Math.round(new Date().getTime() / 1000);

   // Get the signature using the Node.js SDK method api_sign_request
   const signature = cloudinary.v2.utils.api_sign_request(
      {
         timestamp: timestamp,
      },
      process.env.CLOUDINARY_SECRET
   );
   res.statusCode = 200;
   res.json({ signature, timestamp });
});

export default handler;
