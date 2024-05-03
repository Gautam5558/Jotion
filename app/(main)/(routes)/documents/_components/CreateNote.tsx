"use client";
import { Button } from "@/components/ui/button";
import { createNote } from "@/lib/actions/document.action";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const CreateNote = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const handleClick = async () => {
    await createNote({
      userId: user?.id,
      path: pathname,
    });
    toast.success("New note created");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="no notes"
        height="300"
        width="300"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="no notes"
        height="300"
        width="300"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.username} Jotion
      </h2>
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        <PlusCircle className="mr-2 size-4" />
        Create a note
      </Button>
    </div>
  );
};

export default CreateNote;
