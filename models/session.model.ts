import mongoose, { FilterQuery } from "mongoose";

export interface SessionInput {
  userId: string;
  email: string;
  applicationId: string;
  roleId: string;
  permissions: Array<string>;
}

export interface SessionDocument extends mongoose.Document {
  userId: mongoose.ObjectId;
  email: string;
  applicationId: mongoose.ObjectId;
  roleId: mongoose.ObjectId;
  permissions: Array<string>;
  valid: boolean;
}

interface SessionModel extends mongoose.Model<SessionDocument> {}

const sessionSchema = new mongoose.Schema<SessionDocument, SessionModel>({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  applicationId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Applications",
  },
  roleId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Roles",
  },
  email: {
    type: String,
    required: true,
  },
  permissions: {
    type: [],
    required: true,
  },
  valid: {
    type: Boolean,
    default: true,
  },
});
export const SessionModel = mongoose.model("Sessions", sessionSchema);
