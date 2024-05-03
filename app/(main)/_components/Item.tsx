"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { createNote } from "@/lib/actions/document.action";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface Props {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  handleExpand?: () => void;
  handleClick: () => void;
  label: string;
  icon: LucideIcon;
  userId?: string | undefined;
}

const Item = ({
  label,
  icon: Icon,
  userId,
  id,
  documentIcon,
  active,
  expanded,
  level = 0,
  handleExpand,
  handleClick,
  isSearch,
}: Props) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const path = usePathname();

  const handlingExpansion = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleExpand?.();
  };

  const createChildDocument = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!id) {
      return;
    }
    await createNote({ userId, parentDocumentId: id, path });
    toast.success("New note created");
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
          onClick={handlingExpansion}
        >
          <ChevronIcon className="size-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="mr-2 shrink-0 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="mr-2 h-[18px] shrink-0 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span>CTRL</span>K
        </kbd>
      )}
      {!!id && (
        <div
          className="ml-auto flex items-center gap-x-2"
          onClick={(e) => {
            createChildDocument(e);
          }}
        >
          <div className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600">
            <Plus className="size-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  <div
    className="flex gap-x-2 py-[3px]"
    style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
  >
    <Skeleton className="size-4" />
    <Skeleton className="h-4 w-[30%]" />
  </div>;
};

export default Item;
