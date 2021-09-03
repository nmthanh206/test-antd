import { asyncHandler } from "@/utils/asyncHandler";
import generateToken from "@/utils/generateToken";
import User from "@/models/userModel";
import Email from "@/utils/email";
import crypto from "crypto";
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   // console.log("server", { email, password });
   const user = await User.findOne({ email });
   console.log(req.headers.host);
   if (user && (await user.matchPassword(password))) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      });
   } else {
      res.status(401);
      throw new Error("Invalid email or password");
   }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   const userExists = await User.findOne({ email });

   if (userExists) {
      res.status(400);
      throw new Error("User already exists");
   }

   const user = await User.create({
      name,
      email,
      password,
   });

   if (user) {
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid user data");
   }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
         user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
         token: generateToken(updatedUser._id),
      });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find({});
   res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.query.id);

   if (user) {
      await user.remove();
      res.json({ message: "User removed" });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
   const user = await User.findById(req.query.id).select("-password");

   if (user) {
      res.json(user);
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
   const user = await User.findById(req.query.id);

   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
      });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

const forgotPassword = asyncHandler(async (req, res, next) => {
   //// 1) Get user based on POSTed email
   console.log(req.body);
   const user = await User.findOne({ email: req.body.email });
   if (!user) {
      res.status(404);
      throw new Error("There is no user with email address.");
   }
   // 2) Generate the random reset token
   const resetToken = user.createPasswordResetToken();
   await user.save({ validateBeforeSave: false });
   // console.log(user);

   // 3) Send it to user's email
   try {
      // const resetURL = `${req.protocol}://${req.get(
      //   "host"
      // )}/api/users/resetPassword/${resetToken}`;

      const resetURL = `${req.headers.referer}resetPassword/${resetToken}`;
      console.log(resetURL);
      await new Email(user, resetURL).sendPasswordReset();
      res.status(200).json({
         status: "success",
         // message: "Token sent to email!",
         message: `Token sent to email ${req.body.email}!`,
      });
   } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      console.log(err);
      res.status(500);
      throw new Error("There was an error sending the email. Try again later!");
   }
});

const resetPassword = asyncHandler(async (req, res, next) => {
   // // 1) Get user based on the token
   const hashedToken = crypto
      .createHash("sha256")
      .update(req.query.token)
      .digest("hex");
   const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
   });
   // 2) If token has not expired, and there is user, set the new password
   if (!user) {
      res.status(400);
      throw new Error("Token is invalid or has expired");
   }
   user.password = req.body.password;
   user.passwordChangedAt = Date.now() - 1000;
   // user.passwordConfirm = req.body.passwordConfirm;
   user.passwordResetToken = undefined;
   user.passwordResetExpires = undefined;
   await user.save();
   // 3) Update changedPasswordAt property for the user
   // 4) Log the user in, send JWT
   // res.status(200).json({
   //   _id: user._id,
   //   name: user.name,
   //   email: user.email,
   //   isAdmin: user.isAdmin,
   //   token: generateToken(user._id),
   // });
   res.status(200).json({
      status: "success",
      // message: "Token sent to email!",
      message: `Password reset successfully`,
   });
});
export {
   authUser,
   registerUser,
   getUserProfile,
   updateUserProfile,
   getUsers,
   deleteUser,
   getUserById,
   updateUser,
   forgotPassword,
   resetPassword,
};
