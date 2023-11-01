import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
  getRandomProduct,
  saleProduct,
} from "../services/product.service";
import {
  ActionProductInput,
  CreateProductsInput,
  EditProductInput,
  GetProductsInput,
  SaleProductInput,
} from "../schema/product.schema";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductsInput>,
  res: Response
) {
  try {
    const product = await createProduct(req.body);

    if (!product)
      return res
        .status(500)
        .json({ status: 500, error: "could not create new product" })
        .end();

    return res.status(201).json({ status: 201, data: product }).end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function getProductsHandler(
  req: Request<{}, {}, {}, GetProductsInput>,
  res: Response
) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 1;
    const products = await getProducts(limit);

    if (!products)
      return res
        .status(400)
        .json({ status: 400, error: "could not find products" })
        .end();

    return res.status(200).json({ status: 200, data: products }).end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function getRandomProductHandler(req: Request, res: Response) {
  try {
    const product = await getRandomProduct();

    if (!product)
      return res
        .status(400)
        .json({ status: 400, error: "could not generate random product" })
        .end();

    return res.status(200).json({ status: 200, data: product }).end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function editProductHandler(
  req: Request<EditProductInput["params"], {}, EditProductInput["body"]>,
  res: Response
) {
  try {
    await editProduct({ _id: req.params.productId }, req.body);

    return res
      .status(200)
      .json({ status: 200, message: "successfully edited the products" })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function saleProductHandler(
  req: Request<SaleProductInput["params"], {}, SaleProductInput["body"]>,
  res: Response
) {
  try {
    await saleProduct(req.params.productId, req.body.quantity);

    return res
      .status(200)
      .json({ status: 200, message: "successfully sale this product" })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function deleteProductHandler(
  req: Request<ActionProductInput>,
  res: Response
) {
  try {
    const id = req.params.productId;
    await deleteProduct(id);

    return res
      .status(200)
      .json({ status: 200, message: "successfully deleted the product" })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}
