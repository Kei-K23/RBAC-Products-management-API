import { Request, Response } from "express";
import { AssignRoleToUserInput, CreateUserInput } from "../schema/user.schema";
import {
  assignRoleToUserfn,
  createUser,
  getAllUsers,
} from "../services/user.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    assignRoleToUserfn({
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

export async function getAuthUserHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    if (!user)
      return res
        .status(404)
        .json({ status: 404, error: "could not find authorized user" })
        .end();
    return res.status(200).json({ status: 200, data: user });
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function assignRoleToUserHandler(
  req: Request<{}, {}, AssignRoleToUserInput>,
  res: Response
) {
  try {
    const assignRoleToUser = await assignRoleToUserfn(req.body);
    if (!assignRoleToUser)
      return res
        .status(500)
        .json({ status: 500, error: "could not assign role to user" })
        .end();

    return res.status(201).json({ status: 201, data: assignRoleToUser }).end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}
