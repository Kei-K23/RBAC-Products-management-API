import { RolesModel } from "../models/role.model";
import { CreateRoleInput } from "../schema/role.schema";

export async function createRole(payload: CreateRoleInput) {
  try {
    const role = await RolesModel.create(payload);
    return role;
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

export async function getRoleById({ id }: { id: string }) {
  try {
    const role = await RolesModel.findOne({ _id: id });
    if (!role) return false;
    return role;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}