import { Router } from "express";
import {
  createProductHandler,
  getProductsHandler,
  getRandomProductHandler,
} from "../controllers/product.controller";
import validateResource from "../middlewares/validateResource";
import {
  createProductsSchema,
  getProductsSchema,
} from "../schema/product.schema";
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
  router.get(
    "/api/v1/products",
    revalidateAccessToken,
    requiredUser,
    validateResource(getProductsSchema),
    getProductsHandler
  );
  router.get(
    "/api/v1/products/random",
    revalidateAccessToken,
    requiredUser,
    getRandomProductHandler
  );
}
