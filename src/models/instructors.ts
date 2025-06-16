import mongoose from "mongoose";

const InstructorsSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String},
    phone: { type: String },
    ageGroup: { type: mongoose.Schema.Types.ObjectId, ref: "AgeGroups" }, 
    picture: { type: String },
  },
  { collection: "Instructors" }
);

const Instructors = mongoose.models.Instructors || mongoose.model("Instructors",InstructorsSchema);

export default Instructors;