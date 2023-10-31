import { z } from "zod";

export const createProductsSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "product name is required!",
        invalid_type_error: "product name must be string",
      })
      .min(1, "name must be at least one character"),
    description: z
      .string({
        required_error: "product description is required!",
        invalid_type_error: "product description must be string",
      })
      .min(1, "description must be at least one character")
      .optional(),
    averageQuantity: z
      .string({
        required_error: "average quantity is required!",
        invalid_type_error: "average quantity must be string",
      })
      .min(1, "average quantity must be at least one character"),
    quantity: z.number({
      required_error: "product quantity is required!",
      invalid_type_error: "product quantity must be number",
    }),
    price: z.number({
      required_error: "product price is required!",
      invalid_type_error: "product price must be string",
    }),
    distribution: z
      .string({
        required_error: "distribution is required!",
        invalid_type_error: "distribution must be string",
      })
      .min(1, "distribution must be at least one character")
      .optional(),
    made: z
      .string({
        required_error: "made is required!",
        invalid_type_error: "made must be string",
      })
      .min(1, "made must be at least one character")
      .optional(),
    category: z
      .string({
        required_error: "category is required!",
        invalid_type_error: "category must be string",
      })
      .min(1, "category must be at least one character"),
  }),
});

export type CreateProductsInput = z.infer<typeof createProductsSchema>["body"];
