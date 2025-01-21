import express from "express";
import validateData from "../../middlewares/validateData";
import { BookingValidationSchema } from "./booking.validations";
import { BookingController } from "./booking.controller";


const routes = express.Router();

routes.post(
  "/create-booking",
  validateData(BookingValidationSchema.BookingSchema),
  BookingController.createBooking 
);
// routes.get("/", BookingSlotController.getAllBookingSlots);

// routes.get("/:id", BookingSlotController.getSingleBookingSlot);

// routes.patch(
//   "/:id",
//   validateData(bookingSlotSchemaValidation.updateBookingSlotSchema),
//   BookingSlotController.updateBookingSlot,
// );

// routes.delete("/:id", BookingSlotController.deleteBookingSlot);

export const BookingRoutes = routes;