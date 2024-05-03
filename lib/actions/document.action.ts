"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../connectdb";
import Document from "../models/document.model";
import { buildTree } from "../utils";

export const createNote = async (params: {
  userId: string | undefined;
  title?: string;
  path: string;
  parentDocumentId?: string | undefined;
}) => {
  try {
    connectDb();
    const { userId, title, path, parentDocumentId } = params;
    const newNote = new Document({
      userId,
      title: title || "UNTITLED",
      parentDocument: parentDocumentId || null,
    });

    await newNote.save();
    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
};

export const getAllDocuments = async (params: { userId: string | null }) => {
  try {
    connectDb();
    const { userId } = params;
    const notes = await Document.find({ userId, isAchived: false });
    // building a recursive tree for our data to be displayed recursively on the sidebar
    const data = buildTree(notes);

    return { notes: data };
  } catch (err) {
    console.log(err);
  }
};
