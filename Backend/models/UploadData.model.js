import mongoose from "mongoose";

const uploadDataSchema = new mongoose.Schema({
    fileName: {
    type: String,
    required: true,
    unique: true, // 👈 ye important hai
  },
  
  data: {
    type: [mongoose.Schema.Types.Mixed], // Flexible structure
    required: true,
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ your user model name
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UploadData", uploadDataSchema);