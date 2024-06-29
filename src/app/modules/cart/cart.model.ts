import { model, Schema } from "mongoose";
import { ICart } from "./cart.interface";

const cartItemSchema = new Schema<ICart>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Cart = model<ICart>("Cart", cartItemSchema);
