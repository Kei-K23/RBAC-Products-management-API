import { TypeOf, z } from "zod";
import { ALL_PERMISSIONS } from "../config/permissions";

export const createRoleSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "role name is required!",
      invalid_type_error: "role name should be string",
    }),
    applicationId: z.string({
      required_error: "application id is required",
    }),
    permissions: z.array(z.enum([...ALL_PERMISSIONS])),
  }),
});

export type CreateRoleInput = TypeOf<typeof createRoleSchema>["body"];
