import { Router } from "express";
import {
  assignRoleToUserHandler,
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  getAllUsersHandler,
  getAuthUserHandler,
} from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import {
  actionUserSchema,
  assignRoleToUserSchema,
  createUserSchema,
  editUserSchema,
} from "../schema/user.schema";
import revalidateAccessToken from "../middlewares/revalidateAccessToken";
import requiredUser from "../middlewares/requiredUser";
import guard from "../middlewares/guard";
import permissionForAdminAndAuthUser from "../middlewares/permissionForAdminAndAuthUser";

export default function (router: Router) {
  router.get(
    "/api/v1/users",
    revalidateAccessToken,
    guard({ roleName: "SUPER_ADMIN" }),
    getAllUsersHandler
  );
  router.get(
    "/api/v1/users/me",
    revalidateAccessToken,
    requiredUser,
    getAuthUserHandler
  );
  router.post(
    "/api/v1/users",
    validateResource(createUserSchema),
    createUserHandler
  );
  router.delete(
    "/api/v1/users/:userId/:applicationId",
    revalidateAccessToken,
    requiredUser,
    permissionForAdminAndAuthUser,
    validateResource(actionUserSchema),
    deleteUserHandler
  );
  router.put(
    "/api/v1/users/:userId/:applicationId",
    revalidateAccessToken,
    requiredUser,
    permissionForAdminAndAuthUser,
    validateResource(editUserSchema),
    editUserHandler
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
