import { Router } from "express";
import applicationRoute from "./application.route";
import userRouter from "./user.router";

const router = Router();

export default function () {
  applicationRoute(router);
  userRouter(router);
  return router;
}
