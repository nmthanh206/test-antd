import base from "@/utils/base";

import {
   getUserProfile,
   updateUserProfile,
} from "@/controllers/userController";
import { protect } from "@/middleware/authMiddleware";
const handler = base()
   .get(protect, getUserProfile)
   .put(protect, updateUserProfile);

export default handler;
