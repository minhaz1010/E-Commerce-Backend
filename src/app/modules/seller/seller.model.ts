import { model, Schema } from "mongoose";
import { IAddress, ISeller } from "./serller.interface";

const addressSchema = new Schema<IAddress>({
  division: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  localArea: {
    type: String,
    required: true,
  },
  storeNo: {
    type: String,
    required: true,
  },
});

const sellerSchema = new Schema<ISeller>({
  id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
    unique: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  primaryContactNo: {
    type: String,
    required: true,
    unique: true,
  },
  secondaryContactNo: {
    type: String,
    required: true,
  },
  storeAddress: {
    type: addressSchema,
    required: true,
  },
  isDeleted:{
    type:Boolean,
    default:false,
  }
});

export const Seller = model<ISeller>("Seller", sellerSchema);
