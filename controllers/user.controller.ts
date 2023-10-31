import { Request, Response } from "express";
import {
  ActionUserInput,
  AssignRoleToUserInput,
  CreateUserInput,
  EditUserInput,
} from "../schema/user.schema";
import {
  assignRoleToUserfn,
  createUser,
  deleteUser,
  editAssignRoleToUser,
  editUser,
  getAllUsers,
  getUser,
} from "../services/user.service";
import { verifyJWT } from "../utils/jwt.utils";
import { ALL_PERMISSIONS } from "../config/permissions";

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
    const localUser = res.locals.user;

    const user = await getUser({
      _id: localUser.userId,
      applicationId: localUser.applicationId,
    });

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
    const { applicationId, roleId, userId } = req.body;

    const assignRoleToUser = await editAssignRoleToUser(
      {
        applicationId,
        userId,
      },
      {
        roleId,
      }
    );
    if (!assignRoleToUser)
      return res
        .status(500)
        .json({ status: 500, error: "could not assign role to user" })
        .end();

    return res.status(200).json({ status: 200, data: assignRoleToUser }).end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function deleteUserHandler(
  req: Request<ActionUserInput>,
  res: Response
) {
  const { applicationId, userId } = req.params;

  try {
    await deleteUser({ _id: userId, applicationId });

    res.clearCookie("pos_access_token", {
      domain: "localhost",
      path: "/",
    });
    res.clearCookie("pos_refresh_token", {
      domain: "localhost",
      path: "/",
    });

    res.locals.user = {};
    res.locals.cookie = {};

    return res
      .status(200)
      .json({ status: 200, message: "user account is deleted!" })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function editUserHandler(
  req: Request<EditUserInput["params"], {}, EditUserInput["body"]>,
  res: Response
) {
  try {
    const { applicationId, userId } = req.params;

    const editedUser = await editUser(
      { _id: userId, applicationId },
      { ...req.body }
    );

    res.clearCookie("pos_access_token", {
      domain: "localhost",
      path: "/",
    });
    res.clearCookie("pos_refresh_token", {
      domain: "localhost",
      path: "/",
    });

    res.locals.user = {};
    res.locals.cookie = {};

    return res
      .status(200)
      .json({
        status: 200,
        message: "user information is updated! please login again",
      })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}
