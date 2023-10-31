import { Router } from "express";
import {
  createApplicationHandler,
  getApplicationsHandler,
} from "../controllers/application.controller";
import validateResource from "../middlewares/validateResource";
import { createApplicationSchema } from "../schema/application.schema";
import revalidateAccessToken from "../middlewares/revalidateAccessToken";
import guard from "../middlewares/guard";
import requiredUser from "../middlewares/requiredUser";

export default function (router: Router) {
  router.get(
    "/api/v1/applications",
    revalidateAccessToken,
    requiredUser,
    guard({ roleName: "SUPER_ADMIN" }),
    getApplicationsHandler
  );
  router.post(
    "/api/v1/applications",
    revalidateAccessToken,
    requiredUser,
    guard({ roleName: "SUPER_ADMIN" }),
    validateResource(createApplicationSchema),
    createApplicationHandler
  );
}
