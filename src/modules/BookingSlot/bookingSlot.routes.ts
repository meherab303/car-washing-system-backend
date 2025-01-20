
import express from "express";
import validateData from "../../middlewares/validateData";

import { BookingSlotController } from "./bookingSlot.controller";
import { bookingSlotSchemaValidation } from "./bookingSlot.validations";
const routes = express.Router();

routes.post("/create-slot",validateData(bookingSlotSchemaValidation.createBookingSlotSchema),BookingSlotController.createBookingSlot)
routes.get("/", BookingSlotController.getAllBookingSlots);

routes.get("/:id", BookingSlotController.getSingleBookingSlot);

routes.patch(
  "/:id",
  validateData(bookingSlotSchemaValidation.updateBookingSlotSchema),
  BookingSlotController.updateBookingSlot
);

routes.delete("/:id", BookingSlotController.deleteBookingSlot);


export const BookingSlotRoutes=routes