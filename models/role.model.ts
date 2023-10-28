import mongoose from "mongoose";

export interface RolesDocument extends mongoose.Document {
  roleName: string;
  applicationId: mongoose.ObjectId;
  permissions: Array<string>;
}

interface RolesModel extends mongoose.Model<RolesDocument> {}

const rolesSchema = new mongoose.Schema<RolesDocument, RolesModel>(
  {
    roleName: {
      type: String,
      required: true,
      min: [3, "role name must be at least contain 3 characters"],
      validate: {
        validator: async function (value: string) {
          const roleExist = await RolesModel.findOne({
            roleName: value,
          });

          if (roleExist) return false;
          return true;
        },
        message: "role name is already taken",
      },
    },
    applicationId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    permissions: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RolesModel = mongoose.model("Roles", rolesSchema);
