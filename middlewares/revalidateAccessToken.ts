import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.utils";
import { createAccessToken, findSession } from "../services/session.service";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = res.locals.cookie.pos_access_token;
  const refreshToken = res.locals.cookie.pos_refresh_token;

  if (!refreshToken)
    return res
      .status(401)
      .json({ status: 401, error: "refresh token missing! login again" });

  const accessTokenDecoded = verifyJWT({
    token: accessToken,
    secret: "ACCESS_TOKEN_PUBLIC_KEY",
  });

  if (accessTokenDecoded) return next();

  const refreshTokenDecoded = verifyJWT<{
    userId: string;
    applicationId: string;
    roleId: string;
    email: string;
    permissions: Array<string>;
    valid: boolean;
    _id: boolean;
  }>({
    token: refreshToken,
    secret: "REFRESH_TOKEN_PUBLIC_KEY",
  });

  if (!refreshTokenDecoded)
    return res
      .status(401)
      .json({
        status: 401,
        error: "could not refresh access token! invalid refresh token",
      })
      .end();

  const session = await findSession({ _id: refreshTokenDecoded._id });

  if (!session || !session.valid)
    return res.status(401).json({
      status: 401,
      error: "could not refresh access token! invalid refresh token",
    });

  const newAccessToken = await createAccessToken({
    userId: refreshTokenDecoded.userId,
    applicationId: refreshTokenDecoded.applicationId,
    email: refreshTokenDecoded.email,
    permissions: refreshTokenDecoded.permissions,
    roleId: refreshTokenDecoded.roleId,
  });

  res.clearCookie("pos_access_token", {
    domain: "localhost",
    path: "/",
  });

  res.cookie("pos_access_token", newAccessToken, {
    domain: "localhost",
    path: "/",
    maxAge: 60000,
  });

  res.locals.cookie.pos_access_token = newAccessToken;
  res.locals.user = {
    userId: refreshTokenDecoded.userId,
    applicationId: refreshTokenDecoded.applicationId,
    email: refreshTokenDecoded.email,
    permissions: refreshTokenDecoded.permissions,
    roleId: refreshTokenDecoded.roleId,
  };

  return next();
}
