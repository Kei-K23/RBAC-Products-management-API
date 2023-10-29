import mongoose from "mongoose";

export interface SessionInput {
  userId: string;
  email: string;
  applicationId: string;
  roleId: string;
  permissions: Array<string>;
}

interface SessionDocument extends mongoose.Document {
  userId: mongoose.ObjectId;
  email: string;
  applicationId: mongoose.ObjectId;
  roleId: mongoose.ObjectId;
  permissions: Array<string>;
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
    unique: true,
  },
  permissions: {
    type: [],
    required: true,
  },
});
export const SessionModel = mongoose.model("Sessions", sessionSchema);
