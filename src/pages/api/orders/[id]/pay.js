import base from "@/utils/base";

import { updateOrderToPaid } from "@/controllers/orderController";
import { protect } from "@/middleware/authMiddleware";
const handler = base().put(protect, updateOrderToPaid);

export default handler;
