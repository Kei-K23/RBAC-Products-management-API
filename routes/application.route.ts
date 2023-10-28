import { Router } from "express";
import { createApplicationHandler } from "../controllers/application.controller";
import validateResource from "../middlewares/validateResource";
import { createApplicationSchema } from "../schema/application.schema";

export default function (router: Router) {
  router.post(
    "/api/v1/application",
    validateResource(createApplicationSchema),
    createApplicationHandler
  );
}
