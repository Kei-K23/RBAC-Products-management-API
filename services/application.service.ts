import { ApplicationsModel } from "../models/application.model";
import { CreateApplicationInput } from "../schema/application.schema";

export async function createApplication(payload: CreateApplicationInput) {
  try {
    const application = await ApplicationsModel.create(payload);
    return application;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
