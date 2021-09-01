import base from "@/utils/base";

import {
   createProductReview,
   updateProductReview,
} from "@/controllers/productController";
import { protect } from "@/middleware/authMiddleware";
const handler = base()
   .post(protect, createProductReview)
   .put(protect, updateProductReview);

export default handler;
