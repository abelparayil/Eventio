import Event from "../models/Event.js";
import { eventSchema } from "../models/zodSchemas.js";

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.log("Error getting events: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addEvent = async (req, res, next) => {
  try {
    const eventData = eventSchema.parse(req.body);

    const newEvent = new Event(eventData);
    const event = await newEvent.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("validation error:", error.errors);
      return res.status(400).json({ message: error.errors });
    }
  }

  console.log("Error adding event: ", error);
  res.status(500).json({ message: "Internal server error" });
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.log("Error getting event: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const eventData = eventSchema.parse(req.body);

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = eventData.title;
    event.description = eventData.description;
    event.posterUrl = eventData.posterUrl;
    event.eventDate = eventData.eventDate;
    event.eventTime = eventData.eventTime;
    event.eventVenue = eventData.eventVenue;
    event.eventSpeaker = eventData.eventSpeaker;
    event.eventSpeakerPhotoUrl = eventData.eventSpeakerPhotoUrl;

    await event.save();
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("validation error:", error.errors);
      return res.status(400).json({ message: error.errors });
    }
    console.log("Error updating event: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    await event.remove();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Error deleting event: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventBookings = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("bookings");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event.bookings);
  } catch (error) {
    console.log("Error getting event bookings: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
