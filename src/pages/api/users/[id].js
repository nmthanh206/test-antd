import base from "@/utils/base";

import {
   deleteUser,
   getUserById,
   updateUser,
} from "@/controllers/userController";
import { protect, admin } from "@/middleware/authMiddleware";
const handler = base()
   .delete(protect, admin, deleteUser)
   .get(protect, admin, getUserById)
   .put(protect, admin, updateUser);

export default handler;
