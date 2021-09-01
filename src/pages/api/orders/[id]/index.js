import base from "@/utils/base";

import { getOrderById } from "@/controllers/orderController";
import { protect } from "@/middleware/authMiddleware";
const handler = base().get(protect, getOrderById);

export default handler;
