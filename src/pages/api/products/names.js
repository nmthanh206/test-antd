import base from "@/utils/base";

import { getNameProduct } from "@/controllers/productController";

const handler = base().get(getNameProduct);

export default handler;
