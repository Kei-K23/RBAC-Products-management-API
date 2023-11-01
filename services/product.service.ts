import { FilterQuery, UpdateQuery } from "mongoose";
import { ProductDocument, ProductModel } from "../models/products.model";
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
    const products = await ProductModel.find({ quantity: { $gt: 0 } }).limit(
      limitDoc
    );
    if (!products.length) return false;
    return products;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function editProduct(
  filter: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>
) {
  try {
    const editedProduct = await ProductModel.findOneAndUpdate(filter, update);

    return editedProduct;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function saleProduct(productId: string, quantity = 1) {
  try {
    const product = await getProductBy({ _id: productId });
    if (!product) throw new Error("could not update products!");

    const newQuantity = product[0].quantity - quantity;

    if (newQuantity < 0)
      throw new Error("no enough quantity for this product to sale");

    const editedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId },
      {
        quantity: newQuantity,
      }
    );

    return editedProduct;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function deleteProduct(id: string) {
  try {
    await ProductModel.findOneAndDelete({ _id: id });
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getRandomProduct() {
  try {
    const products = await ProductModel.find({ quantity: { $gt: 0 } });
    if (!products.length) return false;
    const random = randomNumber(products.length);
    const randomProduct = products[random];
    return randomProduct;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getProductBy(filter: FilterQuery<ProductDocument>) {
  try {
    const product = await ProductModel.find({
      ...filter,
      quantity: { $gt: 0 },
    });
    if (!product.length) return false;
    return product;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
