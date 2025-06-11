import mongoose from "mongoose";

const AgeGroupsSchema = new mongoose.Schema(
  {
    name: { type: String },
    minAge: { type: Number },
    maxAge: { type: Number},
    description: { type: String},
  },
  { collection: "agegroups" }
);

const AgeGroups = mongoose.models.AgeGroups || mongoose.model("AgeGroups",AgeGroupsSchema);

export default AgeGroups;