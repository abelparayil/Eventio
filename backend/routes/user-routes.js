import express from "express";
import {
  getAllUsers,
  isUser,
  login,
  resendVerificationCode,
  resetPassword,
  signUp,
  verifyUser,
} from "../controllers/user-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/isUser", verifyUserToken, isUser);

userRouter.post("/signup", signUp);
userRouter.post("/verifyEmail", verifyUser);
userRouter.post("/resendCode", resendVerificationCode);
userRouter.post("/login", login);
userRouter.post("/resetPassword", verifyUserToken, resetPassword);

export default userRouter;
