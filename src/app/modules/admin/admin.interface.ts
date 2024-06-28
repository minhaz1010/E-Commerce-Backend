import { Types } from "mongoose";
export interface IAddress {
  division: string;
  district: string;
  city: string;
  localArea?: string;
}

export interface IAdmin {
  id: Types.ObjectId;
  adminId: string;
  adminName: string;
  email: string;
  password: string;
  primaryContactNo: string;
  address: IAddress;
}
