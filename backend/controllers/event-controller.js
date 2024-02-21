import { ZodError } from "zod";
import Event from "../models/Event.js";
import { eventSchema } from "../models/zodSchemas.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    const eventsWithImages = events.map((event) => {
      return {
        _id: event._id,
        eventTitle: event.eventTitle,
        category: event.category,
        eventImages: event.eventImages.map((image) => {
          return {
            imgName: image.imgName,
          };
        }),
        eventDateAndTime: event.eventDateAndTime,
        eventVenue: event.eventVenue,
        ticketPrice: event.ticketPrice,
        description: event.description,
      };
    });
    res.status(200).json(eventsWithImages);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addEvent = async (req, res, next) => {
  console.log("reached");
  try {
    const {
      eventTitle,
      radio,
      venue,
      time,
      startDate,
      ticketprice,
      description,
    } = req.body;
    const image = req.file.filename;
    const eventData = {
      eventTitle,
      category: radio,
      eventImages: [
        {
          imgName: image,
          imgPath: "uploads/" + image,
          imgType: "image",
        },
      ],
      eventDateAndTime: new Date(startDate + " " + time),
      eventVenue: venue,
      ticketPrice: ticketprice,
      description,
    };
    const newEvent = new Event(eventData);
    const event = await newEvent.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.errors });
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    const eventWithImages = {
      _id: event._id,
      eventTitle: event.eventTitle,
      category: event.category,
      eventImages: event.eventImages.map((image) => {
        return {
          imgName: image.imgName,
        };
      }),
      eventDateAndTime: event.eventDateAndTime,
      eventVenue: event.eventVenue,
      ticketPrice: event.ticketPrice,
      description: event.description,
    };
    if (!eventWithImages) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(eventWithImages);
  } catch (error) {
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

    event.eventTitle = eventData.eventTitle;
    event.category = eventData.category;
    event.eventDateAndTime = new Date(eventData.eventDateAndTime);
    event.eventVenue = eventData.eventVenue;
    event.ticketPrice = eventData.ticketPrice;
    event.description = eventData.description;

    await event.save();
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }
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
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventBookings = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("bookings");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(event.bookings);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
