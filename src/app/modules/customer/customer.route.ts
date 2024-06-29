import express from "express";
import { CustomerController } from "./customer.controller";
import { ProductController } from "../products/product.controller";

const router = express.Router();

router.get("/", CustomerController.getAllCustomer);

router.get("/:id", CustomerController.getASingleCustomer);

router.patch("/:id", CustomerController.updateACustomer);

router.delete("/:id", CustomerController.deleteASCustomer);

router.post("/cart/:customerId", CustomerController.addProductIntoCart);

router.get("/cart/:customerId", CustomerController.getProductsFromCart);

export const CustomerRoutes = router;
