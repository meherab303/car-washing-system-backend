import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import { ServiceOfCar } from "./service.service";
import { TService } from "./service.interface";
import { emptyDataCheck } from "../utils/emptyDataCheck";

const createService = catchAsync(async (req, res) => {
  const result = await ServiceOfCar.createServiceIntoDB(req.body as TService);
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Car service is created successfully",
    data: result,
  });
});
const getAllService = catchAsync(async (req, res) => {
  const result = await ServiceOfCar.getAllServiceFromDB();
  const emptyData=emptyDataCheck(result)
  if(emptyData){
    return res.status(httpStatus.NOT_FOUND).json(emptyData)
}
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Car services are retrieved successfully",
    data: result,
  });
});
const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfCar.getSingleServiceFromDB(id);
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Car service is retrieved successfully",
    data: result,
  });
});
const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfCar.updateServiceIntoDB(
    id,
    req.body as Partial<TService>,
  );
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Car service is updated successfully",
    data: result,
  });
});
const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfCar.deleteServiceIntoDB(id);
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Car service is deleted successfully",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
