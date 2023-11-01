import { Router } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  editProductHandler,
  getProductsHandler,
  getRandomProductHandler,
  saleProductHandler,
} from "../controllers/product.controller";
import validateResource from "../middlewares/validateResource";
import {
  actionProductSchema,
  createProductsSchema,
  editProductsSchema,
  getProductsSchema,
  saleProductSchema,
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
  router.post(
    "/api/v1/products/sale/:productId",
    revalidateAccessToken,
    requiredUser,
    validateResource(saleProductSchema),
    saleProductHandler
  );
  router.put(
    "/api/v1/products/:productId",
    revalidateAccessToken,
    requiredUser,
    validateResource(editProductsSchema),
    editProductHandler
  );
  router.delete(
    "/api/v1/products/:productId",
    revalidateAccessToken,
    requiredUser,
    validateResource(actionProductSchema),
    deleteProductHandler
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
