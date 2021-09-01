import base from "@/utils/base";

import { authUser } from "@/controllers/userController";

const handler = base().post(authUser);

export default handler;
