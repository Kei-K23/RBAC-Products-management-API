import { ApplicationsModel } from "../models/application.model";
import { CreateApplicationInput } from "../schema/application.schema";

export async function createApplication(payload: CreateApplicationInput) {
  try {
    return await ApplicationsModel.create(payload);
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getApplications() {
  try {
    const applications = await ApplicationsModel.find();
    if (!applications.length) return false;
    return applications;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
