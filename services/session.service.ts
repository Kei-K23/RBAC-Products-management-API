import { FilterQuery, UpdateQuery } from "mongoose";
import {
  SessionDocument,
  SessionInput,
  SessionModel,
} from "../models/session.model";
import { signJWT } from "../utils/jwt.utils";

export async function createSession(payload: SessionInput) {
  try {
    return await SessionModel.create(payload);
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
export async function editSession(
  filter: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  try {
    const updateSession = await SessionModel.findOneAndUpdate(filter, update);

    return updateSession;
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

    const refreshToken = signJWT({
      payload: session,
      secret: "REFRESH_TOKEN_PRIVATE_KEY",
      options: {
        expiresIn: "3d",
      },
    });

    return refreshToken;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function findSession(filter: FilterQuery<SessionDocument>) {
  try {
    const session = await SessionModel.findOne(filter);
    if (!session) return false;
    return session;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
