import mongoose from "mongoose";
import argon2 from "argon2";

export interface UsersDocument extends mongoose.Document {
  name: string;
  applicationId: mongoose.ObjectId;
  email: string;
  password: string;
}

interface UsersModel extends mongoose.Model<UsersDocument> {
  verifyPassword: (
    candidatePassword: string,
    password: string
  ) => Promise<boolean>;
}

export interface AssignRoleToUserDocument extends mongoose.Document {
  userId: string;
  applicationId: string;
  roleId: string;
}

interface AssignRoleToUserModel
  extends mongoose.Model<AssignRoleToUserDocument> {}

const usersSchema = new mongoose.Schema<UsersDocument, UsersModel>(
  {
    name: {
      type: String,
      required: true,
      min: [3, "user name must be at least contain 3 characters"],
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, "password must be at least 6 character long"],
    },
    applicationId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Applications",
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", async function () {
  const hashPassword = await argon2.hash(this.password);
  this.password = hashPassword;
});

usersSchema.static(
  "verifyPassword",
  async function (candidatePassword: string, password: string) {
    return await argon2.verify(password, candidatePassword);
  }
);

const assignRoleToUserSchema = new mongoose.Schema<
  AssignRoleToUserDocument,
  AssignRoleToUserModel
>(
  {
    userId: {
      type: String,
      required: true,
    },
    applicationId: {
      type: String,
      required: true,
    },
    roleId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UsersModel = mongoose.model<UsersDocument, UsersModel>(
  "Users",
  usersSchema
);

export const AssignRoleToUserModel = mongoose.model<
  AssignRoleToUserDocument,
  AssignRoleToUserModel
>("AssignRoleToUser", assignRoleToUserSchema);
