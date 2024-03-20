import Image from "next/image";
import React from "react";

const Heros = () => {
  return (
    <div className="flex max-w-5xl flex-col items-center justify-center">
      <div className="flex items-center">
        <div className="relative size-[300px] sm:h-[350px] md:size-[400px]">
          <Image
            src="/documents.png"
            alt="heroImg"
            className="object-contain dark:hidden"
            fill
          />
          <Image
            src="/documents-dark.png"
            alt="heroImg"
            className="hidden object-contain dark:block"
            fill
          />
        </div>
        <div className="relative hidden size-[400px] md:block">
          <Image
            src="/reading.png"
            alt="reading"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/reading-dark.png"
            alt="reading"
            fill
            className="hidden object-contain dark:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Heros;
