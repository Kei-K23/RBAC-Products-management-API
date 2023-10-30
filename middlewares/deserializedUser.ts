import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.utils";
import { SessionInput } from "../models/session.model";

export default function (req: Request, res: Response, next: NextFunction) {
  const accessToken = res.locals.cookie.pos_access_token;

  if (!accessToken) return next();
  const decoded = verifyJWT<SessionInput>({
    token: accessToken,
    secret: "ACCESS_TOKEN_PUBLIC_KEY",
  });

  if (!decoded) return next();

  res.locals.user = {
    userId: decoded.userId,
    applicationId: decoded.applicationId,
    email: decoded.email,
    permissions: decoded.permissions,
    roleId: decoded.roleId,
  };

  return next();
}
