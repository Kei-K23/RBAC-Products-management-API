import { Request, Response } from "express";
import { LoginUserInput } from "../schema/user.schema";
import { getUserByEmailAndApplicationId } from "../services/user.service";
import { UsersModel } from "../models/user.model";
import {
  createAccessToken,
  createRefreshToken,
} from "../services/session.service";

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
      maxAge: 60000,
    });
    res.cookie("pos_refresh_token", refreshToken, {
      maxAge: 2.592e8,
    });

    res.locals.user = user;

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
