import mongoose from "mongoose";

export interface RolesDocument extends mongoose.Document {
  name: string;
  applicationId: mongoose.ObjectId;
  permissions: Array<string>;
}

interface RolesModel extends mongoose.Model<RolesDocument> {}

const rolesSchema = new mongoose.Schema<RolesDocument, RolesModel>(
  {
    name: {
      type: String,
      required: true,
      min: [3, "role name must be at least contain 3 characters"],
    },
    applicationId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Applications",
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
