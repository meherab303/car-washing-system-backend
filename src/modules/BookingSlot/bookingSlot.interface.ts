import { Types } from "mongoose";

export type TBookingSlot = {
    service:Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    isBooked?: 'available' | 'booked' | 'canceled';
  };
  