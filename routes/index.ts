import { Router } from "express";
import applicationRoute from "./application.route";

const router = Router();

export default function () {
  applicationRoute(router);
  return router;
}
