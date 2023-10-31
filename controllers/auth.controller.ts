import { Request, Response } from "express";
import { LoginUserInput, LogoutUserInput } from "../schema/user.schema";
import {
  editUser,
  getUserByEmailAndApplicationId,
} from "../services/user.service";
import { UsersModel } from "../models/user.model";
import {
  createAccessToken,
  createRefreshToken,
  editSession,
} from "../services/session.service";
import { verifyJWT } from "../utils/jwt.utils";

export async function loginHandler(
  req: Request<{}, {}, LoginUserInput>,
  res: Response
) {
  const accessToken = res.locals.cookie.pos_access_token;
  const accessTokenDecoded = verifyJWT({
    token: accessToken,
    secret: "ACCESS_TOKEN_PUBLIC_KEY",
  });

  const existingUser = res.locals.user;

  if (accessTokenDecoded || existingUser)
    return res.status(400).json({
      status: 400,
      error: "cannot login! user is already login",
    });

  try {
    const { email, applicationId, password } = req.body;
    const user = await getUserByEmailAndApplicationId({
      email: email,
      applicationId: applicationId,
    });

    if (!user)
      return res.status(401).json({
        status: 401,
        error: "cannot find user! please use correct valid email",
      });

    const isAuth = await UsersModel.verifyPassword(password, user.password);

    if (!isAuth)
      return res.status(403).json({
        status: 403,
        error: "incorrect password! cannot login",
      });

    const accessToken = await createAccessToken({
      userId: user._id,
      applicationId,
      email: user.email,
      permissions: user.permissions,
      roleId: user.roleId,
    });
    const refreshToken = await createRefreshToken({
      userId: user._id,
      applicationId,
      email: user.email,
      permissions: user.permissions,
      roleId: user.roleId,
    });

    res.cookie("pos_access_token", accessToken, {
      domain: "localhost",
      path: "/",
      maxAge: 60000,
    });
    res.cookie("pos_refresh_token", refreshToken, {
      domain: "localhost",
      path: "/",
      maxAge: 2.592e8,
    });

    return res
      .status(200)
      .json({
        status: 200,
        message: "user login successful",
      })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}

export async function logoutHandler(
  req: Request<LogoutUserInput>,
  res: Response
) {
  const accessToken = res.locals.cookie.pos_access_token;
  const accessTokenDecoded = verifyJWT({
    token: accessToken,
    secret: "ACCESS_TOKEN_PUBLIC_KEY",
  });

  const existingUser = res.locals.user;

  if (!accessTokenDecoded || !existingUser)
    return res.status(400).json({
      status: 400,
      error: "cannot logout! user is already logout",
    });

  try {
    const accessToken = res.locals.cookie.pos_access_token;
    const { applicationId, userId } = req.params;

    const accessTokenDecoded = verifyJWT<{
      userId: string;
      applicationId: string;
    }>({
      token: accessToken,
      secret: "ACCESS_TOKEN_PUBLIC_KEY",
    });

    if (!accessTokenDecoded)
      return res
        .status(403)
        .json({ status: 403, error: "missing access token!" })
        .end();

    if (
      accessTokenDecoded.userId !== userId &&
      accessTokenDecoded.applicationId !== applicationId
    )
      return res
        .status(403)
        .json({ status: 403, error: "forbidden! could not logout!" })
        .end();

    await editSession({ userId, applicationId }, { valid: false });

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
      .json({ status: 200, message: "successfully logout" })
      .end();
  } catch (e: any) {
    return res.status(500).json({ status: 500, error: e.message }).end();
  }
}
