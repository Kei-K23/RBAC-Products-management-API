import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import {
  AssignRoleToUserfn,
  createUser,
  getAllUsers,
} from "../services/user.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    AssignRoleToUserfn({
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

export async function getAllUsersHandler(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    if (users && users.length <= 0)
      return res.status(400).json({ error: "no users to provide" }).end();

    return res
      .status(200)
      .json({
        status: 200,
        data: users,
      })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}
