// pages/index.tsx
import React from "react";
import Image from "next/image";

export default function GoalTopics(): JSX.Element {
  return (
    <main className="min-h-screen mt-4">
      {/* 
        columns-2 -> 2 columns on mobile
        sm:columns-3 -> 3 columns starting at sm (640px)
        md:columns-4 -> 4 columns at md (768px) and up
        gap-4 -> spacing between columns
      */}
      <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
        {/* Card 1 */}
        <div className="break-inside-avoid mb-4 p-4 bg-[#6CB28E] rounded-xl shadow text-[#FFECCC]">
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
        </div>

        {/* Card 2 */}
        <div className="break-inside-avoid mb-4 bg-[#3F414E] rounded-xl shadow text-white">
          <div className="bg-[#4E5567] w-full h-24 flex items-end rounded-t-xl">
            <Image
              src={"/assets/images/decoration/better-sleep.svg"}
              width={250}
              height={250}
              className="w-full"
              alt="lose weight"
            />
          </div>
          <h2 className="text-lg font-bold py-6 px-4">Better Sleep</h2>
        </div>

        {/* Card 3 */}
        <div className="break-inside-avoid mb-4 p-4 bg-green-200 rounded shadow">
          <h2 className="text-lg font-bold">Better Sleep</h2>
          <p>Brief content about improving sleep.</p>
        </div>

        {/* Card 4 */}
        <div className="break-inside-avoid mb-4 p-4 bg-yellow-200 rounded shadow">
          <h2 className="text-lg font-bold">Gain Muscle</h2>
          <p>Brief content about muscle gain.</p>
        </div>

        {/* Card 5 (optional) */}
        <div className="break-inside-avoid mb-4 p-4 bg-purple-200 rounded shadow">
          <h2 className="text-lg font-bold">Stay Hydrated</h2>
          <p>Brief content about hydration.</p>
        </div>
      </div>
    </main>
  );
}
