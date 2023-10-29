import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { AssignRoleTOUserfn, createUser } from "../services/user.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    AssignRoleTOUserfn({
      applicationId: user.applicationId.toString(),
      userId: user._id,
    });

    return res
      .status(201)
      .json({
        status: 201,
        data: user,
      })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}
