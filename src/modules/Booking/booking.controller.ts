import catchAsync from "../utils/catchAsync";
import { emptyDataCheck } from "../utils/emptyDataCheck";
import { TBooking } from "./booking.interface";
import { BookingService } from "./booking.service";
import httpStatus from "http-status";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingService.createBookingIntoDB(req.body as TBooking);
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Your Booking is successfull",
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingsFromDB();

  const emptyData = emptyDataCheck(result);
  if (emptyData) {
    return res.status(httpStatus.NOT_FOUND).json(emptyData);
  }

  return res.status(httpStatus.OK).json({
    success: true,
    message: "All booking are retrieved successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const userEmail = req?.user?.userEmail as string;
  console.log(userEmail)

  const result = await BookingService.getMyBookingsFromDB(userEmail);
  const emptyData = emptyDataCheck(result);
  if (emptyData) {
    return res.status(httpStatus.NOT_FOUND).json(emptyData);
  }
  return res.status(httpStatus.OK).json({
    success: true,
    message: "your bookings are retrieved successfully",
    data: result,
  });
});
const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.updateBookingIntoDB(
    id,
    req.body as Partial<TBooking>,
  );

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Booking  updated successfully",
    data: result,
  });
});
const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.cancelledBookingFromDB(id);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "Booking  is cancelled",
    data: result,
  });
});
export const BookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBooking,
  cancelBooking,
};
