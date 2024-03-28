import React from "react";
import Navigation from "./_components/Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
