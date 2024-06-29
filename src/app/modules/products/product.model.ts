import { model, Schema } from "mongoose";
import { IProducts } from "./product.interface";
import { string } from "zod";

const productSchema = new Schema<IProducts>(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productBrand: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productCategory: {
      type: [String],
      required: [true, "A product has minimum one category"],
    },
    productImages: {
      type: [String],
    },
    stock: {
      type: Number,
      required: true,
    },
    productColor: {
      type: [String],
    },
    productSize: {
      type: [String],
    },
    productStatus: {
      type: String,
      default: "available",
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<IProducts>("Product", productSchema);
