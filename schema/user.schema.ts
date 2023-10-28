import { TypeOf, z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "user name is required!",
        invalid_type_error: "user name should be string",
      }),
      email: z
        .string({ required_error: "email is required" })
        .email("invalid email format"),
      password: z
        .string({ required_error: "password is required" })
        .min(6, "password must be at least 6 character long"),
      confirm_password: z
        .string({ required_error: "confirm password is required" })
        .min(6, "confirm password must be at least 6 character long"),
      applicationId: z
        .string({
          required_error: "application id is requried",
        })
        .uuid("invalid application id"),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "confirm password does not match with password",
      path: ["confirm_password"],
    }),
});

export const assignRoleToUserSchema = z.object({
  body: z.object({
    applicationId: z
      .string({
        required_error: "application id is requried",
      })
      .uuid("invalid application id"),
    userId: z
      .string({
        required_error: "user id is requried",
      })
      .uuid("invalid user id"),
    roleId: z
      .string({
        required_error: "role id is requried",
      })
      .uuid("invalid role id"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type AssignRoleToUserInput = TypeOf<
  typeof assignRoleToUserSchema
>["body"];
