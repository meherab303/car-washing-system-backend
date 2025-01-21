import catchAsync from "../utils/catchAsync";
import { TBooking } from "./booking.interface";
import { BookingService } from "./booking.service";
import httpStatus from "http-status";

const createBooking = catchAsync(async (req, res) => {
    const result = await BookingService.createBookingIntoDB(
      req.body as TBooking,
    );
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Your Booking is successfull",
      data: result,
    });
  });

export const BookingController={
    createBooking
}  