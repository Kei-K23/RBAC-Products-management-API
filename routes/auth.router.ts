import { Router } from "express";
import { loginHandler, logoutHandler } from "../controllers/auth.controller";
import validateResource from "../middlewares/validateResource";
import { loginUserSchema, actionUserSchema } from "../schema/user.schema";
import requiredUser from "../middlewares/requiredUser";
import revalidateAccessToken from "../middlewares/revalidateAccessToken";

export default function (router: Router) {
  router.post(
    "/api/v1/auth/login",
    validateResource(loginUserSchema),
    loginHandler
  );
  router.post(
    "/api/v1/auth/logout/:userId/:applicationId",
    revalidateAccessToken,
    requiredUser,
    validateResource(actionUserSchema),
    logoutHandler
  );
}
