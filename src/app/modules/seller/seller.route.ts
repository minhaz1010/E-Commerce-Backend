import express from "express";
import {SellerController} from "./seller.controller";
import validateRequest from "../../middleware/validateRequest";
import {SellerValidation} from "./seller.validation";

const router = express.Router();

router.route("/").get(SellerController.getAllSeller);

router.route("/:id").get(SellerController.getASingleSeller).delete(SellerController.deleteASeller);

router.patch("/:id",validateRequest(SellerValidation.updateSellerValidation),SellerController.updateASeller);

export  const SellerRoutes = router;