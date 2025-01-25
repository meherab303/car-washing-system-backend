import auth from "../../middlewares/auth";
import validateData from "../../middlewares/validateData";
import { User_Role } from "../User/user.constant";
import { AuthControllers } from "./auth.controller";
import { authValidationsSchema } from "./auth.validations";

import express from "express";

const routes = express.Router();




routes.post(
    "/login",
    validateData(authValidationsSchema.loginValidationSchema),
    AuthControllers.loginUser
  );
    
routes.post(
    "/change-password",
    auth(User_Role.admin,User_Role.user),
    validateData(authValidationsSchema.changePasswordValidationSchema),
    AuthControllers.changePassword
  );
  export const AuthRoutes=routes