import express from "express";
import validateData from "../../middlewares/validateData";

import { BookingSlotController } from "./bookingSlot.controller";
import { bookingSlotSchemaValidation } from "./bookingSlot.validations";
import auth from "../../middlewares/auth";
import { User_Role } from "../User/user.constant";
const routes = express.Router();

routes.post(
  "/create-slot",
  auth(User_Role.admin),
  validateData(bookingSlotSchemaValidation.createBookingSlotSchema),
  BookingSlotController.createBookingSlot,
);
routes.get("/", BookingSlotController.getAllBookingSlots);

routes.get("/:id", BookingSlotController.getSingleBookingSlot);

routes.patch(
  "/:id",
  validateData(bookingSlotSchemaValidation.updateBookingSlotSchema),
  auth(User_Role.admin),
  BookingSlotController.updateBookingSlot,
);

routes.delete(
  "/:id",
  auth(User_Role.admin),
  BookingSlotController.deleteBookingSlot,
);

export const BookingSlotRoutes = routes;
