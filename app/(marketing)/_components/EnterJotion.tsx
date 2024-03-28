"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  userId: string | null;
}

const EnterJotion = ({ userId }: Props) => {
  const navigate = useRouter();

  const handleNavigation = () => {
    if (userId) {
      navigate.push("/documents");
    } else {
      navigate.push("/sign-in");
    }
  };

  return (
    <Button onClick={handleNavigation} className="w-max">
      Enter Jotion <ArrowRight className="ml-2 size-4" />{" "}
    </Button>
  );
};

export default EnterJotion;
