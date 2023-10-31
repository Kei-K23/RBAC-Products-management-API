import { Router } from "express";
import validateResource from "../middlewares/validateResource";
import { createRoleSchema } from "../schema/role.schema";
import { createRoleHandler } from "../controllers/role.controller";
import guard from "../middlewares/guard";
import requiredUser from "../middlewares/requiredUser";
import revalidateAccessToken from "../middlewares/revalidateAccessToken";

export default function (router: Router) {
  router.post(
    "/api/v1/role",
    revalidateAccessToken,
    requiredUser,
    guard({ roleName: "SUPER_ADMIN" }),
    validateResource(createRoleSchema),
    createRoleHandler
  );
}
