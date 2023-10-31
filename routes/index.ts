import { Router } from "express";
import applicationRoute from "./application.route";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import roleRoute from "./role.route";

const router = Router();

export default function () {
  applicationRoute(router);
  userRouter(router);
  authRouter(router);
  roleRoute(router);
  return router;
}
