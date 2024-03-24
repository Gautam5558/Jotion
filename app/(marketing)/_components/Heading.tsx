import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Heading = () => {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your Ideas, Documents, & Plans. Unified. welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <Link href="/sign-in">
        <Button>
          Enter Jotion <ArrowRight className="ml-2 size-4" />{" "}
        </Button>
      </Link>
    </div>
  );
};

export default Heading;
