import { FilterQuery } from "mongoose";
import { SYSTEM_ROLE } from "../config/permissons";
import {
  AssignRoleToUserDocument,
  AssingRoleToUserModel,
  UsersModel,
} from "../models/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { getRoleById, getRoleByName } from "./role.service";

export async function createUser(payload: CreateUserInput) {
  try {
    const user = await UsersModel.create(payload);
    return user;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getAllUsers() {
  try {
    const users = await UsersModel.find();
    if (!users.length) return false;
    return users;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getUserByEmailAndApplicationId({
  email,
  applicationId,
}: {
  email: string;
  applicationId: string;
}) {
  try {
    const user = await UsersModel.findOne({ email, applicationId }).lean();

    if (!user) return false;

    const assignRoleToUser = await getUserFromAssignRoleToUser({
      userId: user._id,
      applicationId: user.applicationId,
    });

    if (!assignRoleToUser) return false;

    const role = await getRoleById({ id: assignRoleToUser.roleId });

    if (!role) return false;

    return { ...user, permissions: role.permissions, roleId: role._id };
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function AssignRoleToUserfn({
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
    if (applicationUsers && applicationUsers.length > 1) {
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

export async function getUserFromAssignRoleToUser(
  filter: FilterQuery<AssignRoleToUserDocument>
) {
  try {
    const user = await AssingRoleToUserModel.findOne(filter);
    if (!user) return false;
    return user;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
