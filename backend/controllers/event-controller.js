import mongoose from "mongoose";
import Event from "../models/Event.js";

export const addEvent = async (req, res, next) => {
  const {
    title,
    description,
    posterUrl,
    eventDate,
    eventTime,
    eventVenue,
    eventSpeaker,
    eventSpeakerPhotoUrl,
  } = req.body;

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trime() === "" &&
    !eventDate &&
    !eventTime &&
    eventTime.trim() === "" &&
    !eventVenue &&
    eventVenue.trime() === ""
  ) {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  let event;

  try {
    event = new Event({
      title,
      description,
      posterUrl,
      eventDate,
      eventTime,
      eventVenue,
      eventSpeaker,
      eventSpeaker,
    });
    await event.save();
  } catch (err) {
    return console.log(err);
  }

  if (!event) {
    return res.status(500).json({ message: "Request failed" });
  }

  return res.status(201).json({ movie });
};
