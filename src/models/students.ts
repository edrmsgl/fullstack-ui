import mongoose from "mongoose";

const StudentsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    picture: { type: String, required: true },
    email: { type: String},
    classroom: { type: String },
    dob: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  { collection: "students" }
);

const Students = mongoose.models.Students || mongoose.model("Students", StudentsSchema);

export default Students;