import dbConnect from "@/lib/dbConnect";

export const asyncHandler = (fn) =>
   async function asyncUtilWrap(...args) {
      await dbConnect();
      const fnReturn = fn(...args);
      const next = args[args.length - 1];
      return Promise.resolve(fnReturn).catch(next);
   };
