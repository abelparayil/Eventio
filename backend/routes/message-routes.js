import express from "express";
import { addMessage, getAllMessages } from "../controllers/message-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";
import { verifyAdminToken } from "../middleware/event-middleware.js";

const messageRouter = express.Router();

messageRouter.get("/getAllMessages", verifyAdminToken, getAllMessages);

messageRouter.post("/addMessage", verifyUserToken, addMessage);

export default messageRouter;
