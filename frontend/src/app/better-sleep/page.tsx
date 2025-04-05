'use client';

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AudioPlayer } from "@/components/page-components/better-sleep/audio-player"; // путь может отличаться

const BetterSleepPage = () => {
  const [currentTrack, setCurrentTrack] = useState<null | {
    title: string;
    subtitle?: string;
    src: string;
  }>(null);

  return (
    <div className="bg-[#03174C] w-full min-h-screen flex flex-col text-white">
      <section className="bg-[url('/assets/images/decoration/better-sleep-bg.svg')] bg-cover bg-center w-full h-[18rem] rounded-b-3xl"></section>

      <Link
        className="absolute left-5 top-5 bg-white rounded-full text-gray-700 p-4"
        href={"/"}
      >
        <ArrowLeft />
      </Link>

      <div className="flex flex-col px-4 pt-2 text-[#98A1BD]">
        <p className="font-bold text-xs">7 MIN • SLEEP MUSIC</p>

        <p className="font-bold leading-4 mt-4">
          To have a better sleep, you can listen to our calm sleepy music
        </p>
        <hr className="mt-4" color="#98A1BD" />

        <h2 className="text-white text-xl mt-4">Musics</h2>

        <div className="w-full flex gap-3 mt-2">
          <div className="w-1/2 cursor-pointer" onClick={() =>
            setCurrentTrack({
              title: "Moon Clouds",
              subtitle: "Calm ambient",
              src: "/assets/audio/NeverTell.mp3",
            })
          }>
            <div className="w-full bg-[url('/assets/images/decoration/sleep-decor1.svg')] bg-cover bg-center h-40 rounded-xl"></div>
            <p className="text-white text-lg mt-2">Never Tell - <span className="text-sm text-[#98A1BD]">Luke</span></p>
            <p className="text-[#98A1BD]">4:13 min • calm</p>
          </div>

          <div className="w-1/2 cursor-pointer" onClick={() =>
            setCurrentTrack({
              title: "Up & Up",
              subtitle: "Coldplay - calm remix",
              src: "/assets/audio/lofi.mp3",
            })
          }>
            <div className="w-full bg-[url('/assets/images/decoration/sleep-decor2.svg')] bg-cover bg-center h-40 rounded-xl"></div>
            <p className="text-white text-lg mt-2">
              Sleep lofi - <span className="text-sm text-[#98A1BD]">Coldplay</span>
            </p>
            <p className="text-[#98A1BD]">2:24 min • calm</p>
          </div>
        </div>

        {currentTrack && (
          <AudioPlayer
            title={currentTrack.title}
            subtitle={currentTrack.subtitle}
            src={currentTrack.src}
          />
        )}
      </div>
    </div>
  );
};

export default BetterSleepPage;
