import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";

import { TBookingSlot } from "./bookingSlot.interface";
import { BookingSlotService } from "./bookingSlot.service";

const createBookingSlot = catchAsync(async (req, res) => {
  const result = await BookingSlotService.createBookingSlotIntoDB(req.body as TBookingSlot);
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Booking slot created successfully",
    data: result,
  });
});

const getAllBookingSlots = catchAsync(async (req, res) => {
  const {serviceId}=req?.query || undefined
  const result = await BookingSlotService.getAllBookingSlotFromDB(serviceId as string);
  return res.status(httpStatus.OK).json({
    success: true,
    message: "All booking slots retrieved successfully",
    data: result,
  });
});

const getSingleBookingSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingSlotService.getSingleBookingSlotFromDB(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Booking slot retrieved successfully",
    data: result,
  });
});

const updateBookingSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingSlotService.updateBookingSlotIntoDB(id,req.body as Partial<TBookingSlot>  );

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Booking slot updated successfully",
    data: result,
  });
});

const deleteBookingSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingSlotService.deleteBookingSlotFromDB(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Booking slot deleted successfully",
    data: result,
  });
});

export const BookingSlotController = {
  createBookingSlot,
  getAllBookingSlots,
  getSingleBookingSlot,
  updateBookingSlot,
  deleteBookingSlot,
};
