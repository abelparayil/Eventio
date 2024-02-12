import express from "express";
import {
  getAllUsers,
  login,
  resetPassword,
  signUp,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/resetPassowrd", resetPassword);

export default userRouter;
