import express from "express";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEventBookings,
  getEventById,
  updateEvent,
  upload,
} from "../controllers/event-controller.js";
import { verifyAdminToken } from "../middleware/event-middleware.js";

const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.post(
  "/addEvent",
  verifyAdminToken,
  upload.single("image"),
  addEvent
);
eventRouter.get("/:id", getEventById);
eventRouter.post("/updateEvent/:id", verifyAdminToken, updateEvent);
eventRouter.delete("/deleteEvent/:id", verifyAdminToken, deleteEvent);
eventRouter.get("/bookings/:id", verifyAdminToken, getEventBookings);

export default eventRouter;
