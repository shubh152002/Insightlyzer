import mongoose from "mongoose";

const uploadDataSchema = new mongoose.Schema({
  data: {
    type: [mongoose.Schema.Types.Mixed], // Flexible structure
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UploadData", uploadDataSchema);