import express from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

const modularRoute = [
  {
    path: "/users",
    route: UserRoutes,
  },
];

modularRoute.forEach((route) => router.use(route.path, route.route));

export default router;
