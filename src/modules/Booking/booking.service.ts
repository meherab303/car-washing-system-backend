/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import { TBooking } from "./booking.interface";
import { BookingSlotModel } from "../BookingSlot/bookingSlot.model";
import { BookingModel } from "./booking.model";
import { UserModel } from "../User/user.model";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const createBookingIntoDB = async (payload: TBooking) => {
  const { slot, customer, service } = payload;

  const isCustomerExist = await UserModel.findById(customer);
  if (!isCustomerExist) {
    throw new Error("user doesn't exist");
  }
  const isSlotExist = await BookingSlotModel.findById(slot);

  if (!isSlotExist) {
    throw new Error("slot doesn't exist");
  }
  const isServiceBelongToSlot = await BookingSlotModel.findOne({
    _id: slot,
    service,
  });

  if (!isServiceBelongToSlot) {
    throw new Error("this service is not belong to this slot ");
  }

  if (isSlotExist?.isBooked !== "available") {
    throw new Error("slot is not available");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await BookingModel.create([payload], { session });
    if (!result.length) {
      throw new Error("failed to book your slot");
    }
    await BookingSlotModel.findByIdAndUpdate(
      slot,
      { isBooked: "booked" },
      { session },
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find().populate("customer service slot");
  return result;
};
const getMyBookingsFromDB = async (userEmail: string) => {
  const user = await UserModel.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found !");
  }
  const result = await BookingModel.find({ customer: user._id }).populate(
    "slot",
  ).populate("service").populate("customer");
  const calculateCountdown = (date: string, startTime: string) => {
    // Combine date and start time into a full date-time string
    const serviceSlotDateTime = new Date(`${date}T${startTime}:00`); // Format: "YYYY-MM-DDTHH:mm:ss"
    const currentTime = new Date();
    const timeRemaining = Math.max(0, serviceSlotDateTime.getTime() - currentTime.getTime());
  
    return {
      days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
    };
  };
  return result.map((booking) => ({
    ...booking.toObject(),
    countdown:calculateCountdown(booking?.slot?.date , booking?.slot?.startTime)
  }));
 
 
};
const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const booking = await BookingModel.findById(id);
  if (!booking) {
    throw new Error("Booking  is not found");
  }
  const result = await BookingModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const cancelledBookingFromDB = async (id: string) => {
  const isBookingExist = await BookingModel.findById(id);
  if (!isBookingExist) {
    throw new Error("Booking is not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await BookingSlotModel.findByIdAndUpdate(
      isBookingExist?.slot,
      { isBooked: "available" },
      { session },
    );
    const result = await BookingModel.findByIdAndDelete(id);
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
  updateBookingIntoDB,
  cancelledBookingFromDB,
};
