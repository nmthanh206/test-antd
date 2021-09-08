import mongoose from "mongoose";
import User from "./userModel";
const reviewSchema = mongoose.Schema(
   {
      // name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      product: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Product",
         required: true,
      },
   },
   {
      timestamps: true,
   }
);
reviewSchema.pre(/^find/, function (next) {
   console.log("run user");
   this.populate({
      path: "user",
      select: "name",
      model: User,
   });
   next();
});
export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
