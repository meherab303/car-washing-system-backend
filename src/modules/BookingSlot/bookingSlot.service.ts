import ServiceModel from "../Service/service.model";
import { TBookingSlot } from "./bookingSlot.interface";
import { BookingSlotModel } from "./bookingSlot.model";
import { minutesToTime, TimesToMinutes } from "./BookingSlot.utils";

const createBookingSlotIntoDB = async (payload: TBookingSlot) => {
  const { service, date, startTime, endTime } = payload;

  const isServiceExist = await ServiceModel.findById(service);
  if (!isServiceExist) {
    throw new Error("service is not found");
  }

  const serviceDuration = isServiceExist?.duration || 60;
  const startMinutes = TimesToMinutes(startTime);
  const endMinutes = TimesToMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;
  if (totalDuration <= 0) {
    throw new Error("invalid Time range");
  }
  const numberOfSlots = Math.floor(totalDuration / serviceDuration);
  if (numberOfSlots < 1) {
    throw new Error("duration is too short ");
  }
  const slots = [];
  let currentStartTime = startMinutes;
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = minutesToTime(currentStartTime);
    const slotEndTime = minutesToTime(currentStartTime + serviceDuration);
    currentStartTime += serviceDuration;
    slots.push({
      service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: "available",
    });
  }
  // const isServiceBooked=await BookingSlotModel.findOne({service,isBooked:"booked"})
  // if(isServiceBooked){
  //     throw new Error("service is booked already")
  // }
  const result = await BookingSlotModel.insertMany(slots);
  return result;
};

const getAllBookingSlotFromDB = async (id: string) => {
  const result = await BookingSlotModel.find({
    service: id,
    isBooked: "available",
  }).populate("service");
  return result;
};

const getSingleBookingSlotFromDB = async (id: string) => {
  const result = await BookingSlotModel.findById(id);
  if (!result) {
    throw new Error("Booking slot is not found");
  }
  return result;
};
const updateBookingSlotIntoDB = async (
  id: string,
  payload: Partial<TBookingSlot>,
) => {
  const bookingSlot = await BookingSlotModel.findById(id);
  if (!bookingSlot) {
    throw new Error("Booking Slot is not found");
  }
  const result = await BookingSlotModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteBookingSlotFromDB = async (id: string) => {
  const isBookingSlotExist = await BookingSlotModel.findById(id);
  if (!isBookingSlotExist) {
    throw new Error("Booking Slot is not found");
  }
  const result = await BookingSlotModel.findByIdAndDelete(id, { new: true });
  return result;
};

export const BookingSlotService = {
  createBookingSlotIntoDB,
  getAllBookingSlotFromDB,
  getSingleBookingSlotFromDB,
  updateBookingSlotIntoDB,
  deleteBookingSlotFromDB,
};
