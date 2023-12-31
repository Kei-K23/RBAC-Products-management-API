import { TypeOf, z } from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *        - confirm_password
 *        - applicationId
 *      properties:
 *        email:
 *          type: string
 *          default: foo@example.com
 *        name:
 *          type: string
 *          default: foo
 *        password:
 *          type: string
 *          default: strongPassword
 *        confirm_password:
 *          type: string
 *          default: strongPassword
 *        applicationId:
 *          type: string
 *          default: 653d4f44ebae3d0dc8c73add
 *    UsersResponseData:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        applicationId:
 *          type: string
 *        __id:
 *          type: string
 *        __v:
 *          type: number
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
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
      applicationId: z.string({
        required_error: "application id is required",
      }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "confirm password does not match with password",
      path: ["confirm_password"],
    }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email("invalid email format"),
    applicationId: z.string({
      required_error: "application id is required",
    }),
    password: z
      .string({ required_error: "password is required" })
      .min(6, "password must be at least 6 character long"),
  }),
});

export const assignRoleToUserSchema = z.object({
  body: z.object({
    applicationId: z.string({
      required_error: "application id is required",
    }),
    userId: z.string({
      required_error: "user id is required",
    }),
    roleId: z.string({
      required_error: "role id is required",
    }),
  }),
});

export const actionUserSchema = z.object({
  params: z.object({
    userId: z.string({ required_error: "user id is required" }),
    applicationId: z.string({
      required_error: "application id is required",
    }),
  }),
});

export const editUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "user name is required!",
        invalid_type_error: "user name should be string",
      })
      .optional(),
    email: z
      .string({ required_error: "email is required" })
      .email("invalid email format")
      .optional(),
  }),
  params: z.object({
    userId: z.string({ required_error: "user id is required" }),
    applicationId: z.string({
      required_error: "application id is required",
    }),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>["body"],
  "confirm_password"
>;
export type AssignRoleToUserInput = TypeOf<
  typeof assignRoleToUserSchema
>["body"];

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type ActionUserInput = TypeOf<typeof actionUserSchema>["params"];
export type EditUserInput = TypeOf<typeof editUserSchema>;
