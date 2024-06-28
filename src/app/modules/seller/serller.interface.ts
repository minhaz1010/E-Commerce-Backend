import { Types } from "mongoose";
export interface IAddress {
  division: string;
  district: string;
  city: string;
  localArea: string;
  storeNo: string;
}
export interface ISeller {
  id: Types.ObjectId;
  sellerId: string;
  sellerName: string;
  storeName: string;
  email: string;
  password: string;
  primaryContactNo: string;
  secondaryContactNo?: string;
  storeAddress: IAddress;
}
