import { Request, Response } from "express";
import { createProduct } from "../services/product.service";
import { CreateProductsInput } from "../schema/product.schema";

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
