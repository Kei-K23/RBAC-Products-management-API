import config from "config";
import jwt, { SignOptions } from "jsonwebtoken";

export function signJWT({
  payload,
  secret,
  options,
}: {
  payload: object;
  secret: "ACCESS_TOKEN_PRIVATE_KEY" | "REFRESH_TOKEN_PRIVATE_KEY";
  options?: SignOptions | undefined;
}) {
  const key = config.get<string>(secret);
  return jwt.sign(payload, key, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJWT<T>({
  token,
  secret,
}: {
  token: string;
  secret: "ACCESS_TOKEN_PUBLIC_KEY" | "REFRESH_TOKEN_PUBLIC_KEY";
}): T | null {
  try {
    const key = config.get<string>(secret);
    const decoded = jwt.verify(token, key) as T;
    return decoded;
  } catch (e: any) {
    return null;
  }
}
