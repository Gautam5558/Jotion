"use client";

import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./Item";

interface Props {
  parentDocumentId?: string;
  level?: number;
  data?: any;
  userId: string | undefined;
}

const DocumentList = ({ userId, level = 0, parentDocumentId, data }: Props) => {
  const params: any = useParams;
  const navigate = useRouter();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleExpand = (documentId: string) => {
    setExpanded((prev) => {
      return {
        ...prev,
        [documentId]: !prev[documentId],
      };
    });
  };

  const handleRedirect = (documentId: string) => {
    navigate.push(`/documents/${documentId}`);
  };

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {data?.map((document: any) => {
        return (
          <div key={document._id}>
            <Item
              id={document._id}
              handleClick={() => {
                handleRedirect(document._id);
              }}
              label={document.title}
              icon={FileIcon}
              documentIcon={document.icon}
              active={params.documentId === document._id}
              level={level}
              handleExpand={() => {
                handleExpand(document._id);
              }}
              expanded={expanded[document._id]}
              userId={userId}
            />
            {expanded[document._id] && (
              <DocumentList
                userId={userId}
                parentDocumentId={document._id}
                level={level + 1}
                data={document.children}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default DocumentList;
