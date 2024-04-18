import express from "express";
import {
  addMessage,
  getAllMessages,
} from "../controllers/message-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";
import { verifyAdminToken } from "../middleware/event-middleware.js";

const messageRouter = express.Router();

messageRouter.post("/addMessage", verifyUserToken, addMessage);
messageRouter.get("/getAllMessages", verifyAdminToken, getAllMessages);

export default messageRouter;
