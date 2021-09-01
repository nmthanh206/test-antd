import base from "@/utils/base";

import { forgotPassword } from "@/controllers/userController";

const handler = base().post(forgotPassword);

export default handler;
