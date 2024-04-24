import { ZodError } from "zod";
import Event from "../models/Event.js";
import { eventSchema } from "../models/zodSchemas.js";
import multer from "multer";
import { s3upload } from "../s3Service.js";

const storage = multer.memoryStorage();

const convertTimeTo24Hour = (time, period) => {
  let [hours, minutes] = time.split(":");
  if (period === "PM") {
    hours = parseInt(hours) + 12;
  }
  return `${hours}:${minutes}`;
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export const uploadAndS3Upload = async (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Image upload failed",
      });
    }

    try {
      const result = await s3upload(req.file);
      req.s3Data = result;
      next();
    } catch (error) {
      return res.status(400).json({
        message: "Image upload failed",
      });
    }
  });
};

export const getAllEvents = async (req, res, next) => {
  try {
    let events = await Event.find();
    const eventsWithImages = events.map((event) => {
      let eventDateAndTime = event.eventDateAndTime;
      eventDateAndTime.setHours(eventDateAndTime.getHours() + 5);
      eventDateAndTime.setMinutes(eventDateAndTime.getMinutes() + 30);
      console.log(eventDateAndTime);

      let eventStatus = "Scheduled";

      if (event.eventOngoing) {
        eventStatus = "Ongoing";
      }

      if (event.eventCompleted) {
        eventStatus = "Completed";
      }

      return {
        _id: event._id,
        eventTitle: event.eventTitle,
        category: event.category,
        eventImages: event.eventImages.map((image) => {
          return {
            imgName: process.env.AWS_LINK + image.imgPath,
          };
        }),
        eventDateAndTime: eventDateAndTime,
        eventVenue: event.eventVenue,
        eventStatus: eventStatus,
        ticketPrice: event.ticketPrice,
        description: event.description,
      };
    });
    res.status(200).json(eventsWithImages);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getOngoingEvents = async (req, res, next) => {
  try {
    const events = await Event.find({
      eventOngoing: true,
    });
    const eventsWithImages = events.map((event) => {
      return {
        _id: event._id,
        eventTitle: event.eventTitle,
        category: event.category,
        eventImages: event.eventImages.map((image) => {
          return {
            imgName: process.env.AWS_LINK + image.imgPath,
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
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getCompletedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({
      eventCompleted: true,
    });
    const eventsWithImages = events.map((event) => {
      return {
        _id: event._id,
        eventTitle: event.eventTitle,
        category: event.category,
        eventImages: event.eventImages.map((image) => {
          return {
            imgName: process.env.AWS_LINK + image.imgPath,
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
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const addEvent = async (req, res, next) => {
  try {
    const { eventTitle, radio, venue, time, startdate, ticketprice, description } = JSON.parse(
      req.body.formdata
    );
    const period = "AM";
    if (!period) {
      period = "AM";
    }
    const image = req.s3Data;
    const imageName = image.split("/")[1];
    console.log(imageName);

    const convertedTime = convertTimeTo24Hour(time, period);

    const eventDateTimeUTC = new Date(startdate + "T" + convertedTime + ":00Z");

    const eventData = {
      eventTitle,
      category: radio,
      eventImages: [
        {
          imgName: imageName,
          imgPath: image,
          imgType: "image",
        },
      ],
      eventDateAndTime: eventDateTimeUTC,
      eventVenue: venue,
      ticketPrice: ticketprice,
      description,
    };
    const newEvent = new Event(eventData);
    const event = await newEvent.save();
    res.status(201).json({
      message: "Event added successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.errors,
    });
  }
};

export const convertEventToOngoing = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    if (event.eventOngoing) {
      return res.status(400).json({
        message: "Event already ongoing",
      });
    }
    await Event.findByIdAndUpdate(req.params.id, {
      eventOngoing: true,
    });
    return res.status(200).json({
      message: "Event converted to ongoing",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    const eventDetails = {
      _id: event._id,
      eventTitle: event.eventTitle,
      category: event.category,
      eventDateAndTime: event.eventDateAndTime,
      eventVenue: event.eventVenue,
    };
    if (!eventDetails) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    res.status(200).json(eventDetails);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const eventData = eventSchema.parse(req.body);

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.eventTitle = eventData.eventTitle;
    event.category = eventData.category;
    event.eventDateAndTime = new Date(eventData.eventDateAndTime);
    event.eventVenue = eventData.eventVenue;
    event.ticketPrice = eventData.ticketPrice;
    event.description = eventData.description;

    await event.save();
    res.status(200).json({
      message: "Event updated successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: error.errors,
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getEventBookings = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("bookings");
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    return res.status(200).json(event.bookings);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getEventBookingsStudentDetails = async (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  const event = await Event.findById(id).populate({
    path: "bookings",
    select: "user",
    populate: {
      path: "user",
      select: "name email",
    },
  });
  console.log(event);
  if (!event) {
    return res.status(404).json({
      message: "Event not found",
    });
  }
  return res.status(200).json({
    bookings: event.bookings,
    numberOfBookings: event.numberOfBookings,
  });
};

export const eventCompleted = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await Event.findByIdAndUpdate(req.params.id, {
      eventCompleted: true,
    });
    console.log(event);
    return res.status(200).json({
      message: "Event completed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const eventFilterUser = async (req, res, next) => {
  const { venue, category, startDate, endDate } = req.body;
  const filter = {};
  if (venue) {
    filter.eventVenue = venue;
  }
  if (category) {
    filter.category = category;
  }
  if (startDate && endDate) {
    filter.eventDateAndTime = {
      $gte: startDate,
      $lte: endDate,
    };
  }
  filter.eventOngoing = true;
  try {
    const events = await Event.find(filter);
    if (events.length === 0) {
      return res.status(404).json({
        message: "No events found",
      });
    }
    const eventsWithImages = events.map((event) => {
      return {
        _id: event._id,
        eventTitle: event.eventTitle,
        category: event.category,
        eventImages: event.eventImages.map((image) => {
          return {
            imgName: process.env.AWS_LINK + image.imgPath,
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
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const eventFilterAdmin = async (req, res, next) => {
  const { venue, category, startDate, endDate, ongoing, completed, scheduled } = req.body;
  const filter = {};
  if (venue) {
    filter.eventVenue = venue;
  }
  if (category) {
    filter.category = category;
  }
  if (startDate && endDate) {
    filter.eventDateAndTime = {
      $gte: startDate,
      $lte: endDate,
    };
  }
  if (ongoing) {
    filter.eventOngoing = true;
  }
  if (completed) {
    filter.eventCompleted = true;
  }
  if (scheduled) {
    filter.eventOngoing = false;
    filter.eventCompleted = false;
  }
  try {
    const events = await Event.find(filter);
    if (events.length === 0) {
      return res.status(404).json({
        message: "No events found",
      });
    }
    const eventsWithImages = events.map((event) => {
      return {
        _id: event._id,
        eventTitle: event.eventTitle,
        category: event.category,
        eventImages: event.eventImages.map((image) => {
          return {
            imgName: process.env.AWS_LINK + image.imgPath,
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
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getCategoriesForFilter = async (req, res, next) => {
  try {
    const { field } = req.params;

    const validFields = ["category", "eventVenue"];
    if (!validFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field" });
    }

    const distinctValues = await Event.distinct(field);
    if (distinctValues.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    return res.status(200).json(distinctValues);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
