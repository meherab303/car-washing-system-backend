import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import { UserServices } from "./user.service";
import { TUser } from "./user.interface";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body as TUser);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "user is created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  return res.status(httpStatus.OK).json({
    success: true,
    message: "all Users are retrieved successfull",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);
  return res.status(httpStatus.OK).json({
    success: true,
    message: " User is retrieved successfull",
    data: result,
  });
});
const updateSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const modifiedData = req.body as Partial<TUser>;
  const result = await UserServices.updateSingleUserIntoDB(id, modifiedData);
  return res.status(httpStatus.OK).json({
    success: true,
    message: " User is updated successfull",
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteSingleUserFromDB(id);
  return res.status(httpStatus.OK).json({
    success: true,
    message: " User is deleted successfull",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
