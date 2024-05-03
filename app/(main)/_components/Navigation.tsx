"use client";
import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./UserItem";
import Item from "./Item";
import { createNote } from "@/lib/actions/document.action";
import { toast } from "sonner";
import DocumentList from "./DocumentList";

const Navigation = ({
  notes,
  userId,
}: {
  notes: any;
  userId: string | undefined;
}) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  // It return a boolean
  const isMobile = useMediaQuery("(max-width:768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  if (!isMounted) {
    return null;
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) {
      return console.log("There is some error");
    }
    let newWidth = e.clientX;

    if (newWidth < 240) {
      newWidth = 240;
    }

    if (newWidth > 480) {
      newWidth = 480;
    }

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.width = `calc(100%-${newWidth})`;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = (e: MouseEvent) => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleClick = async () => {
    await createNote({ userId, path: pathname });
    toast.success("New note created");
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          " group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={() => {
            collapse();
          }}
          role="button"
          className={cn(
            "absolute right-2 top-3 size-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="size-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch handleClick={() => {}} />
          <Item label="Settings" icon={Settings} handleClick={() => {}} />
          <Item
            icon={PlusCircle}
            label="New Page"
            userId={userId}
            handleClick={handleClick}
          />
          <div className="mt-4">
            <DocumentList userId={userId} data={notes} />
          </div>
        </div>
        <div
          onMouseDown={(e) => {
            handleMouseDown(e);
          }}
          onClick={() => {
            resetWidth();
          }}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
        />
      </aside>
      <div
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
        ref={navbarRef}
      >
        <nav className="w-full bg-transparent px-3 py-2">
          {isCollapsed && (
            <MenuIcon
              className="size-6 text-muted-foreground"
              onClick={resetWidth}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
