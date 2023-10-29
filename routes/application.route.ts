import { Router } from "express";
import {
  createApplicationHandler,
  getApplicationsHandler,
} from "../controllers/application.controller";
import validateResource from "../middlewares/validateResource";
import { createApplicationSchema } from "../schema/application.schema";

export default function (router: Router) {
  router.get("/api/v1/applications", getApplicationsHandler);
  router.post(
    "/api/v1/applications",
    validateResource(createApplicationSchema),
    createApplicationHandler
  );
}
