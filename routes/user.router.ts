import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
  getAuthUserHandler,
} from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../schema/user.schema";
import revalidateAccessToken from "../middlewares/revalidateAccessToken";
import requiredUser from "../middlewares/requiredUser";

export default function (router: Router) {
  router.get("/api/v1/users", revalidateAccessToken, getAllUsersHandler);
  router.get("/api/v1/users/me", getAuthUserHandler);
  router.post(
    "/api/v1/users",
    validateResource(createUserSchema),
    createUserHandler
  );
}
