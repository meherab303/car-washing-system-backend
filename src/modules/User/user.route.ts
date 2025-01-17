
import express from "express";
import validateData from "../../middlewares/validateData";
import { userSchemaValidations } from "./user.validations";




const routes = express.Router();

routes.post(
  "/api/auth/signup",validateData(userSchemaValidations.createValidationSchema)
);


export const StudentRoutes = routes;