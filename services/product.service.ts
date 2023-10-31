import { ProductModel } from "../models/products.model";
import { CreateProductsInput } from "../schema/product.schema";
import { randomNumber } from "../utils/utils";

export async function createProduct(payload: CreateProductsInput) {
  try {
    return await ProductModel.create(payload);
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getProducts(limit = 1) {
  try {
    const limitDoc = limit * 10;
    const products = await ProductModel.find().limit(limitDoc);
    if (!products.length) return false;
    return products;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
export async function getRandomProduct() {
  try {
    const products = await ProductModel.find();
    if (!products.length) return false;
    const random = randomNumber(products.length);
    const randomProduct = products[random];
    return randomProduct;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
