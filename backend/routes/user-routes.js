import express from "express";
import {
  getAllUsers,
  isUser,
  login,
  resetPassword,
  signUp,
} from "../controllers/user-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/resetPassword", verifyUserToken, resetPassword);
userRouter.get("/isUser", verifyUserToken, isUser);

export default userRouter;
