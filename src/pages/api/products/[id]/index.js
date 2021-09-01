import base from "@/utils/base";

import {
   getProductById,
   deleteProduct,
   updateProduct,
} from "@/controllers/productController";
import { protect, admin } from "@/middleware/authMiddleware";
const handler = base()
   .get(getProductById)
   .delete(protect, admin, deleteProduct)
   .put(protect, admin, updateProduct);

export default handler;
