import { TService } from "./service.interface";
import ServiceModel from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
  const newService = await ServiceModel.create(payload);
  return newService;
};
const getAllServiceFromDB = async () => {
  const result = await ServiceModel.find();
  return result;
};
const getSingleServiceFromDB = async (id: string) => {
  const result = await ServiceModel.findById(id);
  if (!result) {
    throw new Error("service is not found");
  }
  return result;
};
const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  const service = await ServiceModel.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!service) {
    throw new Error("this service doesn't exists");
  }
  const result = await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteServiceIntoDB = async (id: string) => {
  const service = await ServiceModel.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!service) {
    throw new Error("this service doesn't exists");
  }
  const result = await ServiceModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};
export const ServiceOfCar = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceIntoDB,
};
