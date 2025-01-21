import { model, Schema } from "mongoose";
import { vehicletype } from "./booking.constant";
import { TBooking } from "./booking.interface";

const BookingSchema = new Schema(
    {
      customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
      service: { type:Schema.Types.ObjectId, ref: "Service", required: true },
      slot: { type:Schema.Types.ObjectId, ref: "Slot", required: true },
      vehicleType: {
        type: String,
        required: true,
        enum:vehicletype ,
      },
      vehicleBrand: { type: String, required: true },
      vehicleModel: { type: String, required: true },
      manufacturingYear: { type: Number, required: true },
      registrationPlate: { type: String, required: true, unique: true, trim: true },
    },
    { timestamps: true }
  );
  
  export const BookingModel =model<TBooking>("Booking", BookingSchema);