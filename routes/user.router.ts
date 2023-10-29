import { Router } from "express";
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../schema/user.schema";

export default function (router: Router) {
  router.post(
    "/api/v1/user",
    validateResource(createUserSchema),
    createUserHandler
  );
}
