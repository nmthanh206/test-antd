import nc from "next-connect";
import morgan from "morgan";
import { errorHandler } from "@/middleware/errorMiddleware";
export default function base() {
   return nc({ onError: errorHandler }).use(morgan("dev"));
}
