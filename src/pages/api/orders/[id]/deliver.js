import base from "@/utils/base";

import { updateOrderToDelivered } from "@/controllers/orderController";
import { protect, admin } from "@/middleware/authMiddleware";
const handler = base().put(protect, admin, updateOrderToDelivered);

export default handler;
