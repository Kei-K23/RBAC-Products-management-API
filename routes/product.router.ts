import { Router } from "express";
import { createProductHandler } from "../controllers/product.controller";
import validateResource from "../middlewares/validateResource";
import { createProductsSchema } from "../schema/product.schema";
import revalidateAccessToken from "../middlewares/revalidateAccessToken";
import requiredUser from "../middlewares/requiredUser";

export default function (router: Router) {
  router.post(
    "/api/v1/products",
    revalidateAccessToken,
    requiredUser,
    validateResource(createProductsSchema),
    createProductHandler
  );
}
