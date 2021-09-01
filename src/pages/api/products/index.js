import base from "@/utils/base";

import { getProducts, createProduct } from "@/controllers/productController";
import { protect, admin } from "@/middleware/authMiddleware";
const handler = base().get(getProducts).post(protect, admin, createProduct);

export default handler;
