import jwt from "jsonwebtoken";
import { asyncHandler } from "@/utils/asyncHandler";
import User from "server/models/userModel";

const protect = asyncHandler(async (req, res, next) => {
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      try {
         token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         const currentUser = await User.findById(decoded.id).select(
            "-password"
         );

         if (!currentUser) {
            res.status(401);
            return next(
               new Error(
                  "The user belonging to this token does no longer exist."
               )
            );
         }
         if (currentUser.changedPasswordAfter(decoded.iat)) {
            res.status(401);
            return next(
               new Error("User recently changed password! Please log in again.")
            );
         }
         req.user = currentUser;
         next();
      } catch (error) {
         console.error(error);
         res.status(401);
         throw new Error("Not authorized, token failed");
      }
   }

   if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
   }
});

const admin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next();
   } else {
      res.status(401);
      throw new Error("Not authorized as an admin");
   }
};

export { protect, admin };
