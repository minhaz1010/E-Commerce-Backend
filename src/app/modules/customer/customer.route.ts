import express from "express";
import { CustomerController } from "./customer.controller";
import { ProductController } from "../products/product.controller";
import validateRequest from "../../middleware/validateRequest";
import { CartValidations } from "../cart/cart.validation";

const router = express.Router();

router.get("/", CustomerController.getAllCustomer);

router.get("/:id", CustomerController.getASingleCustomer);

router.patch("/:id", CustomerController.updateACustomer);

router.delete("/:id", CustomerController.deleteASCustomer);

// now i am giving customerid in params but after working with authentication and authorization we don't need this

router.post(
  "/:customerId/cart",
  validateRequest(CartValidations.createCartValidationSchema),
  CustomerController.addProductIntoCart,
);

router.get("/:customerId/cart", CustomerController.getProductsFromCart);


router.patch("/:customerId/:productId/cart",CustomerController.updateCartDetails)

export const CustomerRoutes = router;
