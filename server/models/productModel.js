import mongoose from "mongoose";

// const reviewSchema = mongoose.Schema(
//    {
//       name: { type: String, required: true },
//       rating: { type: Number, required: true },
//       comment: { type: String, required: true },
//       user: {
//          type: mongoose.Schema.Types.ObjectId,
//          required: true,
//          ref: "User",
//       },
//    },
//    {
//       timestamps: true,
//    }
// );
// const reviewSchema = mongoose.Schema(
//    {
//       name: { type: String, required: true },
//       rating: { type: Number, required: true },
//       comment: { type: String, required: true },
//       user: {
//          type: mongoose.Schema.Types.ObjectId,
//          required: true,
//          ref: "User",
//       },
//    },
//    {
//       timestamps: true,
//    }
// );

const productSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      name: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      brand: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      // reviews: [
      //    {
      //       type: mongoose.Schema.ObjectId,
      //       ref: "Review",
      //    },
      // ],
      rating: {
         type: Number,
         required: true,
         default: 0,
      },
      numReviews: {
         type: Number,
         required: true,
         default: 0,
      },
      price: {
         type: Number,
         required: true,
         default: 0,
      },
      countInStock: {
         type: Number,
         required: true,
         default: 0,
      },
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

// Virtual populate
productSchema.virtual("reviews", {
   ref: "Review",
   foreignField: "product",
   localField: "_id",
});
// productSchema.pre(/^find/, function (next) {
//    console.log("run");
//    this.populate({
//       path: "reviews",
//       // select: "rating",
//       model: Review,
//    });
//    next();
// });

export default mongoose.models.Product ||
   mongoose.model("Product", productSchema);
