import express from "express";
import validateData from "../../middlewares/validateData";
import { BookingValidationSchema } from "./booking.validations";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";


const routes = express.Router();

routes.post(
  "/create-booking",
  validateData(BookingValidationSchema.BookingSchema),
  BookingController.createBooking 
);
routes.get("/", BookingController.getAllBookings);

routes.get("/my-bookings",auth(), BookingController.getMyBookings);

routes.patch(
  "/:id",
  validateData(BookingValidationSchema.UpdateBookingSchema),
  BookingController.updateBooking,
);

routes.delete("/:id/cancelBooking", BookingController.cancelBooking);

export const BookingRoutes = routes;