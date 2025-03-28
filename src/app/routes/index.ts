import { Router } from "express";
import { UserRoutes } from "../../modules/User/user.route";
import { ServiceRoutes } from "../../modules/Service/service.route";
import { BookingSlotRoutes } from "../../modules/BookingSlot/bookingSlot.routes";
import { BookingRoutes } from "../../modules/Booking/booking.routes";
import { AuthRoutes } from "../../modules/Auth/auth.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/bookingSlot",
    route: BookingSlotRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
