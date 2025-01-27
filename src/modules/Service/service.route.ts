import express from "express";
import { serviceValidationSchema } from "./service.validation";
import { ServiceController } from "./service.controller";
import validateData from "../../middlewares/validateData";
import auth from "../../middlewares/auth";
import { User_Role } from "../User/user.constant";
const routes = express.Router();

routes.post(
  "/create-service",
  auth(User_Role.admin),
  validateData(serviceValidationSchema.createServiceValidationSchema),
  ServiceController.createService,
);
routes.get("/", ServiceController.getAllService);
routes.get("/:id", ServiceController.getSingleService);
routes.put(
  "/:id",
  validateData(serviceValidationSchema.updateServiceValidationSchema),
  auth(User_Role.admin),
  ServiceController.updateService,
);
routes.delete("/:id", auth(User_Role.admin), ServiceController.deleteService);
export const ServiceRoutes = routes;
