import dbConnect from "@/lib/dbConnect";
import Product from "../../model/productModel";
export default async function handler(req, res) {
   const { method } = req;

   await dbConnect();

   switch (method) {
      case "GET":
         try {
            const products = await Product.find(
               {}
            ); /* find all the data in our database */
            res.status(200).json({ success: true, products });
         } catch (error) {
            res.status(400).json({ success: false });
         }
         break;

      default:
         res.status(400).json({ success: false });
         break;
   }
}
