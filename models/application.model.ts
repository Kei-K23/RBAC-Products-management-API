import mongoose from "mongoose";

export interface ApplicationsDocument extends mongoose.Document {
  applicationName: string;
}

interface ApplicationModel extends mongoose.Model<ApplicationsDocument> {}

const applicationsSchema = new mongoose.Schema<
  ApplicationsDocument,
  ApplicationModel
>(
  {
    applicationName: {
      type: String,
      required: true,
      min: [5, "application name must be at least contain 5 characters"],
      validate: {
        validator: async function (value: string) {
          const applicationExist = await ApplicationsModel.findOne({
            applicationName: value,
          });

          if (applicationExist) return false;
          return true;
        },
        message: "application name is already taken",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const ApplicationsModel = mongoose.model(
  "Applications",
  applicationsSchema
);
