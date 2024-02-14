import { z, ZodError } from "zod";

const eventSchema = z.object({
  title: z.string(),
  description: z.string(),
  posterUrl: z.string(),
  eventDate: z.date(),
  eventVenue: z.string(),
  eventSpeaker: z.string().optional(),
  eventSpeakerPhotoUrl: z.string().optional(),
  bookings: z.array(z.string()).optional(),
});

const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

const adminSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export { eventSchema, userSchema, adminSchema };
