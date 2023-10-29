import { SYSTEM_ROLE } from "../config/permissons";
import { AssingRoleToUserModel, UsersModel } from "../models/user.model";
import { AssignRoleToUserInput, CreateUserInput } from "../schema/user.schema";
import { getRoleByName } from "./role.service";

export async function createUser(payload: CreateUserInput) {
  try {
    const user = await UsersModel.create(payload);
    return user;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getUsers(applicationId: string) {
  try {
    const users = await UsersModel.find({ applicationId });
    if (!users.length) return false;
    return users;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function AssignRoleTOUserfn({
  applicationId,
  userId,
  roleId,
}: {
  applicationId: string;
  userId: string;
  roleId?: string;
}) {
  try {
    let roleName = SYSTEM_ROLE.SUPER_ADMIN;

    const applicationUsers = await getUserByApplicationId(applicationId);

    if (applicationUsers && applicationUsers.length > 0) {
      roleName = SYSTEM_ROLE.APPLICATION_USER;
    }

    const role = await getRoleByName({
      name: roleName,
      applicationId,
    });

    const role_id = roleId ? roleId : role && role._id;

    const assignRoleToUser = await AssingRoleToUserModel.create({
      applicationId,
      userId,
      roleId: role_id,
    });
    return assignRoleToUser;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getUserByApplicationId(applicationId: string) {
  try {
    const user = await UsersModel.find({ applicationId });
    if (!user) return false;
    return user;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
