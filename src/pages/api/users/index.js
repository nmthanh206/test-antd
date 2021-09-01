import base from "@/utils/base";

import { registerUser, getUsers } from "@/controllers/userController";
import { protect, admin } from "@/middleware/authMiddleware";
const handler = base().post(registerUser).get(protect, admin, getUsers);

export default handler;
