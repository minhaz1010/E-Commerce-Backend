import { Types } from "mongoose";

export interface IProducts {
  productName: string;
  productDescription: string;
  productBrand: string;
  productCategory: [string];
  productPrice: number;
  stock: number;
  productSize?: [string];
  productColor?: [string];
  productImages?: [string];
  productStatus: "available" | "out-of-stock";
  sellerId: Types.ObjectId;
}
