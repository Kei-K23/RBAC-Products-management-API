import mongoose from "mongoose";
import logger from "./logger";

export default async function (dbURL: string) {
  try {
    await mongoose.connect(dbURL);
    logger.info(`Succssfully connected to database!`);
  } catch (e: any) {
    logger.error(e.message);
  }
}
