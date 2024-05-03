import mongoose, { Schema } from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isAchived: {
      type: Boolean,
      default: false,
    },
    parentDocument: {
      type: Schema.Types.ObjectId,
      ref: "Document",
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Document =
  mongoose.models.Document || mongoose.model("Document", documentSchema);
export default Document;
