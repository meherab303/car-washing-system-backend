import { model, Schema } from "mongoose";
import { TService } from "./service.interface";

const ServiceSchema = new Schema<TService>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      duration: {
        type: Number,
        required: true,
        min: 0, 
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true, 
    }
  );
 
const ServiceModel = model<TService>("Service", ServiceSchema);
  
export default ServiceModel;