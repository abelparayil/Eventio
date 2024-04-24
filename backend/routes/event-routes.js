import express from "express";
import {
  addEvent,
  convertEventToOngoing,
  deleteEvent,
  eventCompleted,
  eventFilterAdmin,
  eventFilterUser,
  getAllEvents,
  getCategoriesForFilter,
  getEventBookings,
  getEventById,
  getOngoingEvents,
  updateEvent,
  upload,
} from "../controllers/event-controller.js";
import { updateAdminToken, verifyAdminToken } from "../middleware/event-middleware.js";
import { verifyUserToken } from "../middleware/user-middleware.js";

const eventRouter = express.Router();

eventRouter.get("/", verifyAdminToken, getAllEvents);
eventRouter.get("/userEvents", getOngoingEvents);
eventRouter.get("/bookings/:id", verifyAdminToken, getEventBookings);
eventRouter.get("/:id", getEventById);
eventRouter.get("/distinctCategory/:field", getCategoriesForFilter);

eventRouter.post("/addEvent", verifyAdminToken, updateAdminToken, upload.single("image"), addEvent);
eventRouter.post("/eventOngoing/:id", verifyAdminToken, convertEventToOngoing);
eventRouter.post("/updateEvent/:id", verifyAdminToken, updateEvent);
eventRouter.post("/eventCompleted/:id", verifyAdminToken, eventCompleted);
eventRouter.post("/filterEventsUser", eventFilterUser);
eventRouter.post("/filterEventsAdmin", verifyAdminToken, eventFilterAdmin);

eventRouter.delete("/deleteEvent/:id", verifyAdminToken, deleteEvent);

export default eventRouter;
