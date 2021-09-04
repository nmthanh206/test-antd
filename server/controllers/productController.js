/* eslint-disable no-console */

import { asyncHandler } from "@/utils/asyncHandler";
import Product from "server/models/productModel";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
   // const pageSize = 10;
   // console.log(req.headers.referer);
   // await dbConnect();
   const pageSize = Number(process.env.PAGE_SIZE) || 8;

   const page = Number(req.query.pageNumber) || 1;
   const keyword = req.query.keyword
      ? {
           name: {
              $regex: req.query.keyword,
              $options: "i",
           },
        }
      : {};

   const count = await Product.countDocuments({ ...keyword });
   const products = await Product.find({ ...keyword })
      .select("-reviews -user -description -countInStock")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

   res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
      pageSize,
   });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.query.id);

   if (product) {
      res.json(product);
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.query.id);

   if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
   // const product = new Product({
   //   name: 'Sample name',
   //   price: 0,
   //   user: req.user._id,
   //   image: '/images/sample.jpg',
   //   brand: 'Sample brand',
   //   category: 'Sample category',
   //   countInStock: 0,
   //   numReviews: 0,
   //   description: 'Sample description',
   // })
   const product = new Product({
      name: req.body.name || "Sample name",
      price: req.body.price || 0,
      user: req.user._id,
      image: req.body.image || "/images/sample.jpg",
      brand: req.body.brand || "Sample brand",
      category: req.body.category || "Sample category",
      countInStock: req.body.countInStock || 0,
      numReviews: 0,
      description: req.body.description || "Sample description",
   });

   const createdProduct = await product.save();
   res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
// const updateProduct = asyncHandler(async (req, res) => {
//   const { name, price, description, image, brand, category, countInStock } =
//     req.body;

//   const product = await Product.findById(req.query.id);

//   if (product) {
//     product.name = name;
//     product.price = price;
//     product.description = description;
//     product.image = image;
//     product.brand = brand;
//     product.category = category;
//     product.countInStock = countInStock;

//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });
//?chinh o day
const updateProduct = asyncHandler(async (req, res) => {
   const { name, price, description, image, brand, category, countInStock } =
      req.body;

   const product = await Product.findById(req.query.id);

   if (product.image !== image) {
      // console.log(product.image);
      try {
         await unlink(`.${product.image}`);

         console.log(`Successfully deleted .${product.image}`);
      } catch (error) {
         console.error("There was an error:", error.message);
      }
   }

   if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
   const { rating, comment } = req.body;

   const product = await Product.findById(req.query.id);

   if (product) {
      const alreadyReviewed = product.reviews.find(
         (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
         res.status(400);
         throw new Error("You already reviewed this product");
      }

      const review = {
         name: req.user.name,
         rating: Number(rating),
         comment,
         user: req.user._id,
      };
      // console.log(review);

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
         product.reviews.reduce((acc, item) => item.rating + acc, 0) /
         product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Update review
// @route   PUT /api/products/:id/reviews
// @access  Private
const updateProductReview = asyncHandler(async (req, res) => {
   const { rating, comment } = req.body;

   const product = await Product.findById(req.query.id);

   if (product) {
      const alreadyReviewed = product.reviews.find(
         (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
         // res.status(400);
         // throw new Error("You already reviewed this product");
         alreadyReviewed.rating = rating;
         alreadyReviewed.comment = comment;
         //    const updatedReview = await alreadyReviewed.save();
         product.numReviews = product.reviews.length;

         product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

         await product.save();
         // res.status(201).json(updatedReview);
         res.status(201).json(alreadyReviewed);
      } else {
         res.status(500).json("You don't have permission");
      }
   } else {
      res.status(404);
      throw new Error("Product not found");
   }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({}).sort({ rating: -1 }).limit(4);

   res.json(products);
});

export {
   getProducts,
   getProductById,
   deleteProduct,
   createProduct,
   updateProduct,
   createProductReview,
   getTopProducts,
   updateProductReview,
};
