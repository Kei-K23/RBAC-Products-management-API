import { Router } from "express";
import { loginHandler, logoutHandler } from "../controllers/auth.controller";
import validateResource from "../middlewares/validateResource";
import { loginUserSchema, logoutSchema } from "../schema/user.schema";
import requiredUser from "../middlewares/requiredUser";

export default function (router: Router) {
  router.post(
    "/api/v1/auth/login",
    validateResource(loginUserSchema),
    loginHandler
  );
  router.post(
    "/api/v1/auth/logout/:userId/:applicationId",
    requiredUser,
    validateResource(logoutSchema),
    logoutHandler
  );
}
