"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StoryPresentation from "./StoryPresentation";
import { useGameStore } from "./GameStore";

export default function RevealStage() {
  const params = useParams<{ roundId: string }>();
  const router = useRouter();
  const { get, hydrated, next, total } = useGameStore();
  const round = get(params.roundId);
  const [interpreterText, setInterpreterText] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showInterpreterModal, setShowInterpreterModal] = useState(false);

  useEffect(() => {
    if (hydrated && (!round || !round.result)) {
      router.replace("/");
    }
  }, [hydrated, round, router]);

  useEffect(() => {
    if (!round?.result) return;
    const location = round.result.location;
    fetch("/api/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: location.name,
        location: location.location,
        year: location.year,
        description: location.description,
        slides: location["slide-data"],
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { text?: string } | null) => setInterpreterText(data?.text ?? null))
      .catch(() => {});
  }, [round]);

  if (!hydrated || !round?.result) return null;

  const result = round.result;
  const following = next(round.id);
  const slides = result.location["slide-data"] || [];

  return (
    <main className="min-h-screen lg:h-screen flex flex-col justify-between bg-[#f5f4f0] text-[#111111] overflow-x-hidden">
      {/* ==================================================================== */}
      {/* 1. TOP PRESENTATION HEADER BAR                                       */}
      {/* ==================================================================== */}
      <header className="border-b border-[#d4d2ca] bg-[#eae8e1] px-4 sm:px-6 py-2.5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#e53924]" />
            <span className="font-mono-tech text-[10px] tracking-widest uppercase font-bold text-[#111111]">
              PRESENTATION DECK
            </span>
          </div>
          <span className="hidden sm:inline text-[#d4d2ca]">|</span>
          <span className="hidden sm:inline font-mono-tech text-[10px] text-[#555555] uppercase tracking-wider truncate max-w-xs md:max-w-md">
            {result.location.name}
          </span>
        </div>

        {/* Slide Counter & Hotkey Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono-tech text-[11px] text-[#111111] font-semibold">
            <span className="text-[#e53924]">SLIDE</span>
            <span>
              {String(slideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[9px] font-mono-tech text-[#737373]">
            <kbd className="border border-[#d4d2ca] bg-[#ffffff] px-1 py-0.5">←</kbd>
            <kbd className="border border-[#d4d2ca] bg-[#ffffff] px-1 py-0.5">→</kbd>
            <span>KEYS</span>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 2. FULL-PAGE PRESENTATION STAGE CONTAINER                            */}
      {/* ==================================================================== */}
      <section className="flex-1 flex flex-col justify-center px-3 sm:px-6 lg:px-8 py-3 lg:py-4 overflow-y-auto">
        <StoryPresentation
          slides={slides}
          currentIndex={slideIndex}
          onSlideChange={setSlideIndex}
          monumentName={result.location.name}
        />
      </section>

      {/* ==================================================================== */}
      {/* 3. DOCKED BOTTOM CONSOLE (OTHER INFO: LEFT & RIGHT)                  */}
      {/* ==================================================================== */}
      <footer className="border-t border-[#d4d2ca] bg-[#eae8e1] px-4 sm:px-6 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 z-20">
        {/* BOTTOM LEFT: Revealed Location & Round Score Telemetry */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          {/* Revealed Monument Meta */}
          <div className="pr-2">
            <div className="font-mono-tech text-[9px] text-[#e53924] tracking-widest uppercase font-bold">
              REVEALED LOCATION
            </div>
            <div className="font-condensed font-bold text-base sm:text-lg text-[#111111] uppercase tracking-wide leading-tight">
              {result.location.name}
            </div>
            <div className="font-mono-tech text-[10px] text-[#666666] leading-tight">
              {result.location.location} · {result.location.year}
            </div>
          </div>

          <div className="hidden sm:block h-7 w-[1px] bg-[#d4d2ca]" />

          {/* Distance Deviation Card */}
          <div className="bg-[#ffffff] border border-[#d4d2ca] px-3 py-1.5 shadow-2xs">
            <div className="font-mono-tech text-[8px] text-[#737373] tracking-widest uppercase">
              DISTANCE ERROR
            </div>
            <div className="font-condensed font-bold text-sm sm:text-base text-[#111111]">
              {result.distance.toFixed(1)} KM
            </div>
          </div>

          {/* Round Score Card */}
          <div className="bg-[#ffffff] border border-[#d4d2ca] px-3 py-1.5 shadow-2xs">
            <div className="font-mono-tech text-[8px] text-[#737373] tracking-widest uppercase">
              ROUND ACCURACY
            </div>
            <div className="font-condensed font-bold text-sm sm:text-base text-[#e53924]">
              +{result.score.toLocaleString()} PTS
            </div>
          </div>

          {/* Pin Coordinates (large screens) */}
          <div className="hidden xl:block bg-[#ffffff] border border-[#d4d2ca] px-3 py-1.5 shadow-2xs">
            <div className="font-mono-tech text-[8px] text-[#737373] tracking-widest uppercase">
              YOUR PIN POINT
            </div>
            <div className="font-mono-tech text-[10px] text-[#444444]">
              {result.guess.latitude.toFixed(2)}°N, {result.guess.longitude.toFixed(2)}°E
            </div>
          </div>

          {/* AI Heritage Interpretation Pill / Modal Trigger */}
          {interpreterText && (
            <button
              onClick={() => setShowInterpreterModal(!showInterpreterModal)}
              className="text-[10px] font-mono-tech tracking-wider uppercase border border-[#111111] bg-[#ffffff] hover:bg-[#111111] hover:text-[#ffffff] px-2.5 py-1.5 transition-colors cursor-pointer"
            >
              ✦ AI ARCHIVAL NOTE
            </button>
          )}
        </div>

        {/* BOTTOM RIGHT: Total Cumulative Score & Main Expedition Advance */}
        <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-[#d4d2ca]/60">
          <div className="text-left md:text-right">
            <div className="font-mono-tech text-[8px] sm:text-[9px] text-[#737373] tracking-widest uppercase">
              TOTAL EXPEDITION
            </div>
            <div className="font-condensed font-bold text-lg sm:text-xl text-[#111111] leading-none">
              {total.toLocaleString()} <span className="text-[10px] text-[#737373]">PTS</span>
            </div>
          </div>

          <button
            className="btn-brutalist-black text-xs px-4 py-2 sm:px-6 sm:py-2.5 tracking-wider"
            onClick={() => router.push(following ? `/play/${following.id}` : "/play/results")}
          >
            <span>{following ? "NEXT LOCATION" : "VIEW FINAL RESULTS"}</span>
            <span className="text-[#e53924]">→</span>
          </button>
        </div>
      </footer>

      {/* ==================================================================== */}
      {/* 4. AI ARCHIVAL INTERPRETER MODAL POPUP                               */}
      {/* ==================================================================== */}
      {showInterpreterModal && interpreterText && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowInterpreterModal(false)}
        >
          <div
            className="bg-[#ffffff] border-2 border-[#111111] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#d4d2ca] pb-3 mb-4">
              <span className="font-mono-tech text-xs font-bold text-[#e53924] tracking-widest uppercase">
                AI HERITAGE INTERPRETER NOTE
              </span>
              <button
                onClick={() => setShowInterpreterModal(false)}
                className="font-mono-tech text-xs font-bold hover:text-[#e53924] p-1 cursor-pointer"
              >
                [✕ CLOSE]
              </button>
            </div>
            <p className="text-sm leading-relaxed text-[#333333] font-sans-clean select-text">
              {interpreterText}
            </p>
            <div className="mt-6 pt-4 border-t border-[#d4d2ca] flex justify-end">
              <button
                onClick={() => setShowInterpreterModal(false)}
                className="btn-brutalist-black text-xs px-4 py-1.5"
              >
                RETURN TO PRESENTATION
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
