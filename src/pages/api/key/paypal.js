import base from "@/utils/base";
import { protect } from "@/middleware/authMiddleware";
const handler = base().get(protect, async (req, res) => {
   res.json(process.env.PAYPAL_CLIENT_ID);
});

export default handler;
