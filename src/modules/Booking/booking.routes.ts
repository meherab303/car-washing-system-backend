import express from "express";
import validateData from "../../middlewares/validateData";
import { BookingValidationSchema } from "./booking.validations";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { User_Role } from "../User/user.constant";


const routes = express.Router();

routes.post(
  "/create-booking",auth(User_Role.user),
  validateData(BookingValidationSchema.BookingSchema),
  BookingController.createBooking 
);
routes.get("/",auth(User_Role.admin), BookingController.getAllBookings);

routes.get("/my-bookings",auth(User_Role.user), BookingController.getMyBookings);

routes.patch(
  "/:id",
  validateData(BookingValidationSchema.UpdateBookingSchema),
  auth(User_Role.admin,User_Role.user),
  BookingController.updateBooking,
);

routes.delete("/:id/cancelBooking",auth(User_Role.admin), BookingController.cancelBooking);

export const BookingRoutes = routes;