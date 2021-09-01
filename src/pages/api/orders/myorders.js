import base from "@/utils/base";

import { getMyOrders } from "@/controllers/orderController";
import { protect } from "@/middleware/authMiddleware";
const handler = base().get(protect, getMyOrders);

export default handler;
