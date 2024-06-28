import { model, Schema } from "mongoose";
import { IAddress, IAdmin } from "./admin.interface";

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
  },
});

const adminSchema = new Schema<IAdmin>({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
    unique: true,
  },
  adminName: {
    type: String,
    required: true,
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
  address: {
    type: addressSchema,
    required: true,
  },
});

export const Admin = model<IAdmin>("Admin", adminSchema);
