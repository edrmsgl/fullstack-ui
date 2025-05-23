import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: Number, required: true },
  },
  { collection: "users" } // elle koleksiyon belirttik
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
