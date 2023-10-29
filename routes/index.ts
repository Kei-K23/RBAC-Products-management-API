import { Router } from "express";
import applicationRoute from "./application.route";
import userRouter from "./user.router";
import authRouter from "./auth.router";

const router = Router();

export default function () {
  applicationRoute(router);
  userRouter(router);
  authRouter(router);
  return router;
}
