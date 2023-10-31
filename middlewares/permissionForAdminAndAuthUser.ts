import { Request, Response, NextFunction } from "express";
import { ALL_PERMISSIONS } from "../config/permissions";

export default function (req: Request, res: Response, next: NextFunction) {
  const { userId, applicationId } = req.params;
  const existingUser = res.locals.user;

  const isSuperAdminPermissions =
    JSON.stringify(existingUser.permissions) ===
      JSON.stringify(ALL_PERMISSIONS) &&
    existingUser.applicationId === applicationId;

  const authUser =
    existingUser.userId === userId &&
    existingUser.applicationId === applicationId;

  if (!authUser) {
    if (!isSuperAdminPermissions) {
      return res
        .status(403)
        .json({
          status: 403,
          error: "forbidden!  you are not authorized user to perform action ",
        })
        .end();
    } else {
      return next();
    }
  }

  return next();
}
