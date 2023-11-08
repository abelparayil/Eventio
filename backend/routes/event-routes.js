import express from "express";
import { addEvent } from "../controllers/event-controller.js";

const eventRouter = express.Router();

eventRouter.get("/", addEvent);

export default eventRouter;
