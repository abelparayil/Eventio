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
  uploadAndS3Upload,
} from "../controllers/event-controller.js";
import { verifyAdminToken } from "../middleware/event-middleware.js";
import { verifyUserToken } from "../middleware/user-middleware.js";

const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/userEvents", verifyUserToken, getOngoingEvents);
eventRouter.get("/bookings/:id", verifyAdminToken, getEventBookings);
eventRouter.get("/:id", getEventById);
eventRouter.get("/distinctCategory/:field", getCategoriesForFilter);

eventRouter.post("/addEvent", verifyAdminToken, uploadAndS3Upload, addEvent);
eventRouter.post("/eventOngoing/:id", verifyAdminToken, convertEventToOngoing);
eventRouter.post("/updateEvent/:id", verifyAdminToken, updateEvent);
eventRouter.post("/eventCompleted/:id", verifyAdminToken, eventCompleted);
eventRouter.post("/filterEventsUser", verifyUserToken, eventFilterUser);
eventRouter.post("/filterEventsAdmin", verifyAdminToken, eventFilterAdmin);

eventRouter.delete("/deleteEvent/:id", verifyAdminToken, deleteEvent);

export default eventRouter;
