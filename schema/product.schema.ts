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

export const getProductsSchema = z.object({
  query: z.object({
    limit: z
      .string({
        required_error: "limit is required!",
        invalid_type_error: "limit number must be string",
      })
      .optional(),
  }),
});
export const editProductsSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name must be at least one character").optional(),
    description: z
      .string()
      .min(1, "description must be at least one character")
      .optional(),
    averageQuantity: z
      .string()
      .min(1, "average quantity must be at least one character")
      .optional(),
    quantity: z.number().optional(),
    price: z.number().optional(),
    distribution: z
      .string()
      .min(1, "distribution must be at least one character")
      .optional(),
    made: z.string({}).min(1, "made must be at least one character").optional(),
    category: z
      .string({})
      .min(1, "category must be at least one character")
      .optional(),
  }),
  params: z.object({
    productId: z.string({
      required_error: "product id is required!",
      invalid_type_error: "product id must be string",
    }),
  }),
});

export const actionProductSchema = z.object({
  params: z.object({
    productId: z.string({
      required_error: "product id is required!",
      invalid_type_error: "product id must be string",
    }),
  }),
});

export type CreateProductsInput = z.infer<typeof createProductsSchema>["body"];
export type GetProductsInput = z.infer<typeof getProductsSchema>["query"];
export type EditProductInput = z.infer<typeof editProductsSchema>;
export type ActionProductInput = z.infer<typeof actionProductSchema>["params"];
