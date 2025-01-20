import { model, Schema } from "mongoose";
import { TBookingSlot } from "./bookingSlot.interface";

const bookingSlotSchema= new Schema({
    service: { type:Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      default: 'available',
    },
  });
  
  export  const BookingSlotModel =model<TBookingSlot>('BookingSlot', bookingSlotSchema);
  
