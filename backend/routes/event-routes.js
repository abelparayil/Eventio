import express from "express";
import {
  addEvent,
  convertEventToOngoing,
  deleteEvent,
  eventCompleted,
  eventFilterAdmin,
  eventFilterUser,
  getAllEvents,
  getEventBookings,
  getEventById,
  getOngoingEvents,
  updateEvent,
  upload,
} from "../controllers/event-controller.js";
import { updateAdminToken, verifyAdminToken } from "../middleware/event-middleware.js";
import { verifyUserToken } from "../middleware/user-middleware.js";

const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/userEvents", verifyUserToken, getOngoingEvents);
eventRouter.get("/bookings/:id", verifyAdminToken, getEventBookings);
eventRouter.get("/:id", getEventById);

eventRouter.post("/addEvent", verifyAdminToken, updateAdminToken, upload.single("image"), addEvent);
eventRouter.post("/eventOngoing/:id", verifyAdminToken, convertEventToOngoing);
eventRouter.post("/updateEvent/:id", verifyAdminToken, updateEvent);
eventRouter.post("/eventCompleted/:id", verifyAdminToken, eventCompleted);
eventRouter.post("/filterEventsUser", verifyUserToken, eventFilterUser);
eventRouter.post("/filterEventsAdmin", verifyAdminToken, eventFilterAdmin);

eventRouter.delete("/deleteEvent/:id", verifyAdminToken, deleteEvent);

export default eventRouter;
