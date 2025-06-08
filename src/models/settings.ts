import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    category: { type: String, required: true },
    path: { type: String, required: true },
  },
  { collection: "settings" }
);

const Settings = mongoose.models.Sidemenu || mongoose.model("Settings", SettingsSchema);

export default Settings;