import React from "react";
import EnterJotion from "./EnterJotion";
import { auth } from "@clerk/nextjs";

const Heading = () => {
  const { userId } = auth();

  return (
    <div className="flex max-w-3xl flex-col items-center gap-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your Ideas, Documents, & Plans. Unified. welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <EnterJotion userId={userId} />
    </div>
  );
};

export default Heading;
