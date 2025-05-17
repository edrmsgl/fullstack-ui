import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String},
    password: {type: Number, required: true}
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User