
import express from "express";
import validateData from "../../middlewares/validateData";
import { userSchemaValidations } from "./user.validations";
import { UserController } from "./user.controller";




const routes = express.Router();

routes.post(
  "/signup",
  validateData(userSchemaValidations.createUserValidationSchema),
  UserController.createUser
);
routes.get("/",UserController.getAllUsers)


routes.get("/:id",UserController.getSingleUser)
routes.patch("/:id",validateData(userSchemaValidations.updateUserValidationSchema),UserController.updateSingleUser)
routes.delete("/:id",UserController.deleteSingleUser)


export const UserRoutes = routes;