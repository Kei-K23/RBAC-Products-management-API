import { FilterQuery } from "mongoose";
import { RolesDocument, RolesModel } from "../models/role.model";
import { CreateRoleInput } from "../schema/role.schema";

export async function createRole(payload: CreateRoleInput) {
  try {
    return await RolesModel.create(payload);
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getRoleByName({
  name,
  applicationId,
}: {
  name: string;
  applicationId: string;
}) {
  try {
    const role = await RolesModel.findOne({
      name,
      applicationId,
    });
    if (!role) return false;
    return role;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getRole(filter: FilterQuery<RolesDocument>) {
  try {
    const role = await RolesModel.findOne(filter);
    if (!role) return false;
    return role;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
