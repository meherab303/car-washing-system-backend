/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TService } from "./service.interface";
import ServiceModel from "./service.model";
import { BookingSlotModel } from "../BookingSlot/bookingSlot.model";

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
   const session = await mongoose.startSession();
   try{
         session.startTransaction();
         await BookingSlotModel.deleteMany({service:id,isBooked:"available"},{session})
         const result = await ServiceModel.findByIdAndUpdate(id, { isDeleted: true });
         await session.commitTransaction()
         await session.endSession()
         return result
       }catch(error:any){
         await session.abortTransaction()
         await session.endSession()
         throw new Error(error);
     
       }
  
  
};
export const ServiceOfCar = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceIntoDB,
};
