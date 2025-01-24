import validateData from "../../middlewares/validateData";
import { AuthControllers } from "./auth.controller";
import { authValidationsSchema } from "./auth.validations";

import express from "express";

const routes = express.Router();




routes.post(
    "/login",
    validateData(authValidationsSchema.loginValidationSchema),
    AuthControllers.loginUser
  );
  export const AuthRoutes=routes