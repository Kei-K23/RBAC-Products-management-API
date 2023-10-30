import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
} from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../schema/user.schema";
import revalidateAccessToken from "../middlewares/revalidateAccessToken";

export default function (router: Router) {
  router.get("/api/v1/users", revalidateAccessToken, getAllUsersHandler);
  router.post(
    "/api/v1/users",
    validateResource(createUserSchema),
    createUserHandler
  );
}
