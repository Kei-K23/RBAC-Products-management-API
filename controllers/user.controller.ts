import { Request, Response } from "express";
import {
  ActionUserInput,
  AssignRoleToUserInput,
  CreateUserInput,
} from "../schema/user.schema";
import {
  assignRoleToUserfn,
  createUser,
  deleteUser,
  editAssignRoleToUser,
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
  const existingUser = res.locals.user;

  const isSuperAdminPermissions =
    JSON.stringify(existingUser.permissions) ===
      JSON.stringify(ALL_PERMISSIONS) &&
    existingUser.applicationId === applicationId;

  try {
    const user = await getUser({ _id: userId, applicationId });

    if (!user)
      return res
        .status(404)
        .json({ status: 404, error: "user cannot find" })
        .end();

    if (
      user._id !== existingUser.userId &&
      user.applicationId !== existingUser.applicationId
    ) {
      if (isSuperAdminPermissions) {
        await deleteUser({ _id: userId, applicationId });
      } else {
        return res
          .status(403)
          .json({
            status: 403,
            error:
              "forbidden! you are not authorized user to delete this account",
          })
          .end();
      }
    }

    if (
      user._id === existingUser.userId &&
      user.applicationId === existingUser.applicationId
    )
      await deleteUser({ _id: userId, applicationId });

    return res
      .status(200)
      .json({ status: 200, message: "user account is deleted!" })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}
