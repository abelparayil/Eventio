import express from "express";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEventBookings,
  getEventById,
  updateEvent,
} from "../controllers/event-controller.js";

const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.post("/addEvent", addEvent);
eventRouter.get("/:id", getEventById);
eventRouter.post("/updateEvent/:id", updateEvent);
eventRouter.delete("/deleteEvent/:id", deleteEvent);
eventRouter.get("/bookings/:id", getEventBookings);

export default eventRouter;
