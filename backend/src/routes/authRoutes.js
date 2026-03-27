import express from "express";
import {
  changePassword,
  deleteUser,
  deleteUserById,
  forgotPassword,
  getAllUsers,
  getUserById,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resendVerificationEmail,
  resetPassword,
  updateUserById,
  updateUserProfile,
  verifyEmail,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/refresh-token", refreshToken);
authRouter.get("/profile", getUserProfile);
authRouter.put("/profile", updateUserProfile);
authRouter.post("/change-password", changePassword);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/resend-verification-email", resendVerificationEmail);
authRouter.delete("/delete-user", deleteUser);
authRouter.get("/users", getAllUsers);
authRouter.get("/users/:id", getUserById);
authRouter.put("/users/:id", updateUserById);
authRouter.delete("/users/:id", deleteUserById);

export default authRouter;
