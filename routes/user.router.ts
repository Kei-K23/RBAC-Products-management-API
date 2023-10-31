import { Router } from "express";
import {
  assignRoleToUserHandler,
  createUserHandler,
  getAllUsersHandler,
  getAuthUserHandler,
} from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import {
  assignRoleToUserSchema,
  createUserSchema,
} from "../schema/user.schema";
import revalidateAccessToken from "../middlewares/revalidateAccessToken";
import requiredUser from "../middlewares/requiredUser";
import guard from "../middlewares/guard";

export default function (router: Router) {
  router.get("/api/v1/users", revalidateAccessToken, getAllUsersHandler);
  router.get("/api/v1/users/me", requiredUser, getAuthUserHandler);
  router.post(
    "/api/v1/users",
    revalidateAccessToken,
    validateResource(createUserSchema),
    createUserHandler
  );
  router.post(
    "/api/v1/users/assign_role",
    revalidateAccessToken,
    requiredUser,
    guard({ roleName: "SUPER_ADMIN" }),
    validateResource(assignRoleToUserSchema),
    assignRoleToUserHandler
  );
}
