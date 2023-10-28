import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

export default function () {
  const app = express();

  app.use(cors());
  app.use(express.json());
  return app;
}
