import { Types } from "mongoose";
export interface IAddress {
  division: string;
  district: string;
  city: string;
  localArea?: string;
}

export interface ICustomer {
  id: Types.ObjectId;
  customerId: string;
  customerName: string;
  email: string;
  password: string;
  primaryContactNo: string;
  secondaryContactNo?: string;
  address: IAddress;
}
