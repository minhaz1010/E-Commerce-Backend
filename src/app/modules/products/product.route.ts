import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post(
  "/create-product",
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct,
);

router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getASingleProduct);
router.patch(
  "/:id",
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct,
);

router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;






