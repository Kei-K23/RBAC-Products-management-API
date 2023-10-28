import { TypeOf, z } from "zod";

export const createApplicationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is requried",
      invalid_type_error: "name should be string",
    }),
  }),
});

export type CreateApplicationInput = TypeOf<
  typeof createApplicationSchema
>["body"];
