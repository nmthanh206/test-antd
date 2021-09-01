import base from "@/utils/base";

import { addOrderItems, getOrders } from "@/controllers/orderController";
import { protect, admin } from "@/middleware/authMiddleware";
const handler = base()
   .post(protect, addOrderItems)
   .get(protect, admin, getOrders);

export default handler;
