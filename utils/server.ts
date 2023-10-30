import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import routes from "../routes";
import cookie from "../middlewares/cookie";
import deserializedUser from "../middlewares/deserializedUser";
import revalidateAccessToken from "../middlewares/revalidateAccessToken";
dotenv.config();

export default function () {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookie);
  app.use(deserializedUser);
  app.use(routes());
  return app;
}
