import base from "@/utils/base";

import { getTopProducts } from "@/controllers/productController";

const handler = base().get(getTopProducts);

export default handler;
