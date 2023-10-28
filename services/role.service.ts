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
