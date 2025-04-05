"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  subtitle?: string;
  src: string;
}

export const AudioPlayer = ({ title, subtitle, src }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio?.currentTime || 0);
    const setMeta = () => setDuration(audio?.duration || 0);

    if (audio) {
      audio.play();
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setMeta);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setMeta);
      }
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime += seconds;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="rounded-2xl p-6 mt-6 text-white text-center mb-10">
      <p className="text-xl font-semibold">{title}</p>
      {subtitle && <p className="text-sm text-[#98A1BD] mt-1">{subtitle}</p>}

      {/* Progress Slider */}
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={handleSliderChange}
          className="w-full accent-white"
        />
        <div className="flex justify-between text-xs text-[#98A1BD] mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button onClick={() => skipTime(-15)} className="text-white">
          <RotateCcw size={32} />
          <p className="text-xs">15</p>
        </button>

        <button
          onClick={togglePlay}
          className="bg-white p-6 rounded-full text-[#0B1736]"
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>

        <button onClick={() => skipTime(15)} className="text-white">
          <RotateCw size={32} />
          <p className="text-xs">15</p>
        </button>
      </div>

      <audio ref={audioRef} src={src} preload="auto" />
    </div>
  );
};
