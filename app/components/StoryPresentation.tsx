"use client";

import { useEffect } from "react";
import type { StorySlide } from "@/lib/types";

interface StoryPresentationProps {
  slides: StorySlide[];
  currentIndex: number;
  onSlideChange: (index: number) => void;
  monumentName: string;
}

export default function StoryPresentation({
  slides,
  currentIndex,
  onSlideChange,
  monumentName,
}: StoryPresentationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onSlideChange(Math.max(0, currentIndex - 1));
      } else if (e.key === "ArrowRight") {
        onSlideChange(Math.min(slides.length - 1, currentIndex + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onSlideChange, slides.length]);

  if (!slides || !slides.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-[#ffffff] border border-[#d4d2ca]">
        <p className="font-mono-tech text-xs text-[#737373] uppercase tracking-widest">
          No archival story slides available for this site.
        </p>
      </div>
    );
  }

  const slide = slides[currentIndex];

  return (
    <div className="w-full h-full max-w-[1360px] mx-auto bg-[#ffffff] border border-[#d4d2ca] shadow-md grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:h-[calc(100vh-190px)] overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Left Column: Cinematic Archival Photography Presentation Stage      */}
      {/* ------------------------------------------------------------------ */}
      <div className="lg:col-span-7 bg-[#111111] border-b lg:border-b-0 lg:border-r border-[#d4d2ca] relative flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
        {/* Top telemetry inside photo panel */}
        <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#a3a3a3] tracking-widest uppercase z-10">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#e53924]" />
            PLATE {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-[#888888]">19TH CENTURY SURVEY</span>
        </div>

        {/* Center Image Canvas */}
        <div className="my-auto relative flex items-center justify-center w-full py-4 max-h-[360px] lg:max-h-[calc(100vh-320px)]">
          {slide.image ? (
            <img
              src={slide.image}
              alt={slide.image_caption || slide.title}
              className="w-full max-h-[320px] lg:max-h-[calc(100vh-340px)] object-contain filter grayscale contrast-110"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-48 border border-dashed border-[#333333] flex flex-col items-center justify-center p-6 text-center font-mono-tech text-xs text-[#737373]">
              <span>[MONOCHROME HISTORICAL PLATE]</span>
              <span className="text-[10px] text-[#555555] mt-1">{monumentName}</span>
            </div>
          )}
        </div>

        {/* Bottom Image Caption Bar */}
        <div className="pt-2 border-t border-[#333333] flex items-center justify-between font-mono-tech text-[10px] text-[#a3a3a3] tracking-wider truncate">
          <span className="truncate pr-2">{slide.image_caption || slide.title}</span>
          <span className="text-[#e53924] shrink-0 font-bold">ARC / 1880</span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Right Column: Narrative Story & Slide Controls                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#ffffff] overflow-y-auto">
        <div>
          {/* Slide Section Sub-header */}
          <div className="flex items-center justify-between border-b border-[#d4d2ca] pb-3 mb-6">
            <span className="font-mono-tech text-[11px] text-[#e53924] font-bold tracking-widest uppercase">
              CHRONICLE // PART {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-mono-tech text-[11px] text-[#737373] tracking-widest">
              {currentIndex + 1} / {slides.length}
            </span>
          </div>

          {/* Grand Slide Headline */}
          <h2 className="font-condensed font-bold text-2xl sm:text-3xl lg:text-4xl text-[#111111] uppercase tracking-tight leading-[0.95] mb-5">
            {slide.title}
          </h2>

          {/* Story Narrative Content */}
          <div className="text-sm sm:text-base text-[#3b3a36] leading-relaxed font-sans-clean select-text space-y-4">
            <p>{slide.content}</p>
          </div>
        </div>

        {/* Slide Controls at bottom of narrative panel */}
        <div className="mt-8 pt-6 border-t border-[#d4d2ca] flex items-center justify-between gap-4">
          <button
            onClick={() => onSlideChange(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="btn-brutalist-outline text-xs px-4 py-2"
          >
            ← PREVIOUS
          </button>

          {/* Slide Progress Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => onSlideChange(i)}
                className={`h-1.5 transition-all cursor-pointer ${
                  i === currentIndex
                    ? "w-5 bg-[#e53924]"
                    : "w-1.5 bg-[#d4d2ca] hover:bg-[#111111]"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => onSlideChange(Math.min(slides.length - 1, currentIndex + 1))}
            disabled={currentIndex === slides.length - 1}
            className="btn-brutalist-outline text-xs px-4 py-2"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
