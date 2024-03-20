"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./Logo";
import { ToggleTheme } from "@/components/ToggleTheme";

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;
