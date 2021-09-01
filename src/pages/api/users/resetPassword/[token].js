import base from "@/utils/base";

import { resetPassword } from "@/controllers/userController";

const handler = base().patch(resetPassword);
export default handler;
