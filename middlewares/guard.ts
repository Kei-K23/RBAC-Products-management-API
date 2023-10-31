import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.utils";
import { SessionInput } from "../models/session.model";
import { getRole } from "../services/role.service";
import { SYSTEM_ROLE_TYPE } from "../config/permissions";

export default ({ roleName }: { roleName: string | SYSTEM_ROLE_TYPE }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = res.locals.cookie.pos_access_token;

    const accessTokenDecoded = verifyJWT<SessionInput>({
      token: accessToken,
      secret: "ACCESS_TOKEN_PUBLIC_KEY",
    });

    if (!accessTokenDecoded)
      return res
        .status(401)
        .json({ status: 401, error: "missing access token!" });

    const requiredRole = await getRole({
      name: roleName,
      applicationId: accessTokenDecoded.applicationId,
    });

    const roleFormAccessToken = await getRole({
      _id: accessTokenDecoded.roleId,
      applicationId: accessTokenDecoded.applicationId,
    });

    if (!requiredRole || !roleFormAccessToken)
      return res.status(400).json({
        status: 400,
        message: "could not find the role for the application",
      });

    if (requiredRole.name !== roleFormAccessToken.name)
      return res.status(403).json({
        status: 403,
        message: "you have not right permission and authorization",
      });

    return next();
  };
