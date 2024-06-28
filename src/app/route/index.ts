import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import {SellerRoutes} from "../modules/seller/seller.route";
import {CustomerRoutes} from "../modules/customer/customer.route";

const router = express.Router();

const modularRoute = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/sellers",
    route: SellerRoutes
  },
  {
    path: "/customers",
    route: CustomerRoutes
  }
];

modularRoute.forEach((route) => router.use(route.path, route.route));

export default router;
