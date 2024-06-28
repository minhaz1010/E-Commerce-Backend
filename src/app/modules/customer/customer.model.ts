import { model, Schema } from "mongoose";
import { IAddress, ICustomer } from "./custoemr.interface";
import { string } from "zod";

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
  localArea: String,
});

const customerSchema = new Schema<ICustomer>(
  {
    customerName: {
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
    customerId: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    primaryContactNo: {
      type: String,
      required: true,
      unique: true,
    },
    secondaryContactNo: {
      type: String,
    },
      isDeleted:{
        type: Boolean,
          default: false,
      }
  },
  {
    timestamps: true,
  },
);

export const Customer = model<ICustomer>("Customer", customerSchema);
