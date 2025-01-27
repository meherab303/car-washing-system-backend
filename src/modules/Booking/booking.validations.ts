import { z } from "zod";
import { vehicletype } from "./booking.constant";
const BookingSchema = z.object({
  body: z.object({
    customer: z.string().min(1, "Customer ID is required"),
    service: z.string().min(1, "Service ID is required"),
    slot: z.string().min(1, "Slot ID is required"),
    vehicleType: z.enum([...(vehicletype as [string, ...string[]])]),
    vehicleBrand: z.string().min(1, "Vehicle brand is required").trim(),
    vehicleModel: z.string().min(1, "Vehicle model is required").trim(),
    manufacturingYear: z
      .number()
      .int("Manufacturing year must be an integer")
      .min(1886, "Invalid manufacturing year") // First automobile was made in 1886
      .max(
        new Date().getFullYear(),
        "Manufacturing year cannot be in the future",
      ),
    registrationPlate: z
      .string()
      .min(1, "Registration plate is required")
      .trim(),
  }),
});
const UpdateBookingSchema = z.object({
  body: z.object({
    customer: z.string().min(1, "Customer ID is required"),
    service: z.string().min(1, "Service ID is required"),
    slot: z.string().min(1, "Slot ID is required"),
    vehicleType: z.enum([...(vehicletype as [string, ...string[]])]).optional(),
    vehicleBrand: z
      .string()
      .min(1, "Vehicle brand is required")
      .trim()
      .optional(),
    vehicleModel: z
      .string()
      .min(1, "Vehicle model is required")
      .trim()
      .optional(),
    manufacturingYear: z
      .number()
      .int("Manufacturing year must be an integer")
      .min(1886, "Invalid manufacturing year")
      .max(
        new Date().getFullYear(),
        "Manufacturing year cannot be in the future",
      )
      .optional(),
    registrationPlate: z
      .string()
      .min(1, "Registration plate is required")
      .trim()
      .optional(),
  }),
});

export const BookingValidationSchema = {
  BookingSchema,
  UpdateBookingSchema,
};
