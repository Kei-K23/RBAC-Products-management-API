import { Router } from "express";
import { loginHandler } from "../controllers/auth.controller";
import validateResource from "../middlewares/validateResource";
import { loginUserSchema } from "../schema/user.schema";

export default function (router: Router) {
  router.post(
    "/api/v1/auth/login",
    validateResource(loginUserSchema),
    loginHandler
  );
}
