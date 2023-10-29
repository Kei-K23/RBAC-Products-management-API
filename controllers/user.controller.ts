import { Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schema/user.schema";
import {
  AssignRoleToUserfn,
  createUser,
  getAllUsers,
  getUserByEmailAndApplicationId,
} from "../services/user.service";
import { UsersModel } from "../models/user.model";

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

export async function loginHandler(
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) {
  try {
    const { email, applicationId, password } = req.body;
    const user = await getUserByEmailAndApplicationId({ email, applicationId });

    if (!user)
      return res.status(401).json({
        status: 401,
        error: "cannot find user! please use correcct valid email",
      });

    const isAuth = await UsersModel.verifyPassword(password, user.password);

    if (!isAuth)
      return res.status(403).json({
        status: 403,
        error: "incorrect password! cannot login",
      });

    return res
      .status(200)
      .json({
        status: 200,
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
