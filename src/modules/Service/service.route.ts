
import express from "express"
import { serviceValidationSchema } from "./service.validation";
import { ServiceController } from "./service.controller";
import validateData from "../../middlewares/validateData";
const routes = express.Router();

routes.post(
    "/create-service",
    validateData(serviceValidationSchema.createServiceValidationSchema),
    ServiceController.createService
  );
routes.get("/",ServiceController.getAllService)  
routes.get("/:id",ServiceController.getSingleService)  
routes.put("/:id",validateData(serviceValidationSchema.updateServiceValidationSchema),ServiceController.updateService) 
routes.delete("/:id",ServiceController.deleteService) 
export const ServiceRoutes = routes;
