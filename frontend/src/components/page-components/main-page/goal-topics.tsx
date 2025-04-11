// pages/index.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function GoalTopics(): JSX.Element {
  return (
    <main className="min-h-screen mt-4">
      <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
        {/* Card 1 */}
        <Link href={'/lose-weight'} className="block  break-inside-avoid mb-4 p-4 bg-[#6CB28E] rounded-xl shadow text-[#FFECCC]">
          <Image
            src={"/assets/images/decoration/lose-weight.svg"}
            width={250}
            height={250}
            className="w-40 h-40"
            alt="lose weight"
          />
          <h2 className="text-lg font-bold">
            Lose <br /> Weight
          </h2>
        </Link>

        {/* Card 2 */}
        <Link href={"/better-sleep"} className="block break-inside-avoid mb-4 bg-[#3F414E] rounded-xl shadow text-white" >
          <div className="bg-[#4E5567] w-full h-24 flex items-end rounded-t-xl">
            <Image
              src={"/assets/images/decoration/better-sleep.svg"}
              width={250}
              height={230}
              className="w-full"
              alt="lose weight"
            />
          </div>
          <h2 className="text-lg font-bold py-6 px-4">Better Sleep</h2>
        </Link>

        {/* Card 3 */}
        <Link href={'/special-diet'} className="block relative z-0 overflow-hidden mb-4 p-4 pb-0 bg-[#8FBBFE] rounded-xl shadow break-inside-avoid">
          {/* Put the decorative image behind (negative z-index) */}
          <Image
            src="/assets/images/decoration/special-diet-decoration.svg"
            width={250}
            height={250}
            alt="Decoration"
            className="absolute top-20 right-0 w-40 h-40 -z-10"
          />

          {/* The front image and text can have normal or positive z-index */}
          <Image
            src="/assets/images/decoration/special-diet.svg"
            width={250}
            height={250}
            alt="lose weight"
            className="w-40 h-28 z-10"
          />

          <h2 className="text-lg font-bold z-20 py-2 pb-4 text-[#FFECCC]">
            Special <br /> Diet
          </h2>
        </Link>

        {/* Card 4 */}
        <Link href={'/gain-mass'} className="block break-inside-avoid mb-4 p-4 bg-[#AEEBD9] rounded-xl shadow">
          <Image
            src="/assets/images/decoration/gain-muscle.svg"
            width={300}
            height={300}
            alt="lose weight"
            className="w-40 h-40 z-10"
          />

          <h2 className="text-lg font-bold text-[#3F414E] leading-6">
            Gain Muscle <br /> Mass
          </h2>
        </Link>
      </div>
    </main>
  );
}
