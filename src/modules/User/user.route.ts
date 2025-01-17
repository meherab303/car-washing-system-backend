
import express from "express";
import validateData from "../../middlewares/validateData";
import { userSchemaValidations } from "./user.validations";
import { UserController } from "./user.controller";




const routes = express.Router();

routes.post(
  "/signup",
  validateData(userSchemaValidations.createValidationSchema),
  UserController.createUser
);


export const UserRoutes = routes;