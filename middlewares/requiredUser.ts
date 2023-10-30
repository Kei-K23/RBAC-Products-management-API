import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.utils";

export default function (req: Request, res: Response, next: NextFunction) {
  const accessToken = res.locals.cookie.pos_access_token;
  const refreshToken = res.locals.cookie.pos_refresh_token;

  if (!accessToken)
    return res
      .status(401)
      .json({ status: 401, error: "access token missing! login again" });
  if (!refreshToken)
    return res
      .status(401)
      .json({ status: 401, error: "refresh token missing! login again" });

  const accessTokenDecoded = verifyJWT({
    token: accessToken,
    secret: "ACCESS_TOKEN_PUBLIC_KEY",
  });
  const refreshTokenDecoded = verifyJWT({
    token: refreshToken,
    secret: "REFRESH_TOKEN_PUBLIC_KEY",
  });

  if (!accessTokenDecoded)
    return res
      .status(401)
      .json({ status: 401, error: "invalid access token! login again" });
  if (!refreshTokenDecoded)
    return res
      .status(401)
      .json({ status: 401, error: "invalid refresh token! login again" });

  return next();
}
