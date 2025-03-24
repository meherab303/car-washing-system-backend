import express from "express";
import validateData from "../../middlewares/validateData";
import { userSchemaValidations } from "./user.validations";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { User_Role } from "./user.constant";

const routes = express.Router();

routes.post(
  "/signup",
  validateData(userSchemaValidations.createUserValidationSchema),
  UserController.createUser,
);
routes.get("/", auth(User_Role.admin), UserController.getAllUsers);
routes.get("/getMe", auth(User_Role.user,User_Role.admin), UserController.getMe);
routes.get("/:id", auth(User_Role.admin,User_Role.user), UserController.getSingleUser);

routes.patch(
  "/:id",
  validateData(userSchemaValidations.updateUserValidationSchema),
  auth(User_Role.admin,User_Role.user),
  UserController.updateSingleUser,
);
routes.delete("/:id", auth(User_Role.admin), UserController.deleteSingleUser);

export const UserRoutes = routes;
