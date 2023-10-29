import { SessionInput, SessionModel } from "../models/session.model";
import { signJWT } from "../utils/jwt.utils";

export async function createSession(palyload: SessionInput) {
  try {
    return await SessionModel.create(palyload);
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function createAccessToken(payload: SessionInput) {
  try {
    const accessToken = signJWT({
      payload,
      secret: "ACCESS_TOKEN_PRIVATE_KEY",
      options: {
        expiresIn: "1m",
      },
    });

    return accessToken;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function createRefreshToken(payload: SessionInput) {
  try {
    const session = (await createSession(payload)).toJSON();

    const accessToken = signJWT({
      payload: session,
      secret: "ACCESS_TOKEN_PRIVATE_KEY",
      options: {
        expiresIn: "3d",
      },
    });

    return accessToken;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
