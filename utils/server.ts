import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import routes from "../routes";
dotenv.config();

export default function () {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes());
  return app;
}
