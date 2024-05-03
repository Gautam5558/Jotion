import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function buildTree(documents: any) {
  const tree: any = [];

  function findChildren(parentId: any) {
    const children: any = [];
    documents.forEach((doc: any) => {
      if (
        doc.parentDocument &&
        doc.parentDocument.toString() === parentId.toString()
      ) {
        const child = {
          ...doc._doc,
          children: findChildren(doc._id),
        };
        children.push(child);
      }
    });
    return children;
  }

  documents.forEach((doc: any) => {
    if (!doc.parentDocument) {
      const root = {
        ...doc._doc,
        children: findChildren(doc._id),
      };
      tree.push(root);
    }
  });

  return tree;
}

/*
export const organizeData = (documents: any) => {
  const documentMap = new Map();

  // Map each document by its ID for efficient lookup
  documents.forEach((document) => {
    document.children = [];
    documentMap.set(document._id, document);
  });

  // Add child documents to their parent's children array
  documents.forEach((document) => {
    const parentID = document.parentID;
    if (parentID && documentMap.has(parentID)) {
      documentMap.get(parentID).children.push(document);
    }
  });

  // Find and return root documents (documents without a parent)
  const rootDocuments = documents.filter((document) => !document.parentID);
  return rootDocuments;
};
*/
