import { FilterQuery, UpdateQuery } from "mongoose";
import { SYSTEM_ROLE } from "../config/permissions";
import {
  AssignRoleToUserDocument,
  AssignRoleToUserModel,
  UsersDocument,
  UsersModel,
} from "../models/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { getRole, getRoleByName } from "./role.service";

export async function createUser(payload: CreateUserInput) {
  try {
    const user = await UsersModel.create(payload);
    return user;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getUser(filter: FilterQuery<UsersDocument>) {
  try {
    const user = await UsersModel.findOne(filter, { password: 0, __v: 0 });
    if (!user) return false;
    return user;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function editUser(
  filter: FilterQuery<UsersDocument>,
  update: UpdateQuery<UsersDocument>
) {
  try {
    const user = await UsersModel.findOneAndUpdate(filter, update);
    return user;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function deleteUser({
  _id,
  applicationId,
}: {
  _id: string;
  applicationId: string;
}) {
  try {
    await UsersModel.findOneAndDelete({ _id, applicationId });
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function getAllUsers() {
  try {
    const users = await UsersModel.find({}, { password: 0 });
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
    const user = await UsersModel.findOne({ email, applicationId });

    if (!user) return false;

    const assignRoleToUser = await getUserFromAssignRoleToUser({
      userId: user._id,
      applicationId: user.applicationId,
    });

    if (!assignRoleToUser) return false;

    const role = await getRole({ _id: assignRoleToUser.roleId });

    if (!role) return false;
    return {
      ...user.toJSON(),
      permissions: role.permissions,
      roleId: role._id,
    };
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function assignRoleToUserfn({
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
    const assignRoleToUser = await AssignRoleToUserModel.create({
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
    const user = await UsersModel.find({ applicationId }, { password: 0 });
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
    const user = await AssignRoleToUserModel.findOne(filter);
    if (!user) return false;
    return user;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}

export async function editAssignRoleToUser(
  filter: FilterQuery<AssignRoleToUserDocument>,
  update: UpdateQuery<AssignRoleToUserDocument>
) {
  try {
    const assignRoleToUser = await AssignRoleToUserModel.findOneAndUpdate(
      filter,
      update
    );
    if (!assignRoleToUser) return false;
    return assignRoleToUser;
  } catch (e: any) {
    throw new Error(e.message.toString());
  }
}
