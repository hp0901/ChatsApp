import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,        // ✅ <-- this field was missing
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
