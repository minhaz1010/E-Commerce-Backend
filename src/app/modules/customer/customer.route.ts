import express from "express";
import {CustomerController} from "./customer.controller";


const router= express.Router();


router.get("/",CustomerController.getAllCustomer);

router.get("/:id",CustomerController.getASingleCustomer);

router.patch("/:id",CustomerController.updateACustomer);

router.delete("/:id",CustomerController.deleteASCustomer)

export const CustomerRoutes = router;