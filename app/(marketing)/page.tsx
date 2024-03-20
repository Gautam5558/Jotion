import React from "react";
import Heading from "./_components/Heading";
import Heros from "./_components/Heros";
import Footer from "./_components/Footer";

const LandingPage = () => {
  return (
    <div className="flex min-h-full flex-col dark:bg-[#1f1f1f]">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
        <Heading />
        <Heros />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
