import React from "react";
import Navigation from "./_components/Navigation";
import { getAllDocuments } from "@/lib/actions/document.action";
import { auth } from "@clerk/nextjs";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const { notes }: any = await getAllDocuments({ userId });

  return (
    <div className="flex h-full dark:bg-[#1f1f1f]">
      <Navigation
        userId={userId?.toString()}
        notes={JSON.parse(JSON.stringify(notes))}
      />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
