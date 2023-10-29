import * as dotenv from "dotenv";

dotenv.config();

const { access_token_private_key } = JSON.parse(
  process.env.ACCESS_TOKEN_PRIVATE_KEY as string
);

const { access_token_public_key } = JSON.parse(
  process.env.ACCESS_TOKEN_PUBLIC_KEY as string
);

const { refresh_token_private_key } = JSON.parse(
  process.env.REFRESH_TOKEN_PRIVATE_KEY as string
);

const { refresh_token_public_key } = JSON.parse(
  process.env.REFRESH_TOKEN_PUBLIC_KEY as string
);

export default {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  ACCESS_TOKEN_PRIVATE_KEY: access_token_private_key,
  ACCESS_TOKEN_PUBLIC_KEY: access_token_public_key,
  REFRESH_TOKEN_PRIVATE_KEY: refresh_token_private_key,
  REFRESH_TOKEN_PUBLIC_KEY: refresh_token_public_key,
};
