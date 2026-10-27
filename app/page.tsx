"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGameStore } from "./components/GameStore";

/* -------------------------------------------------------------------------- */
/* Technical Crosshair SVG Component                                          */
/* -------------------------------------------------------------------------- */
function Crosshair({ className = "w-6 h-6 text-[#e53924]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

export default function Home() {
  const router = useRouter();
  const { start, hydrated } = useGameStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showAboutModal, setShowAboutModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowAboutModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const begin = async () => {
    setBusy(true);
    setError("");
    try {
      const round = await start();
      if (round) {
        router.push(`/play/${round.id}`);
      } else {
        setError("No playable expeditions available. Please try again.");
      }
    } catch {
      setError("Could not launch the expedition. Please check your connection.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eae8e1] py-4 sm:py-8 md:py-12 px-2 sm:px-4 md:px-6">
      {/* 
        ========================================================================
        MAIN BRUTALIST GRID CONTAINER
        Strict 1px boxy borders, sharp corners, off-white canvas
        ========================================================================
      */}
      <div className="max-w-[1240px] mx-auto bg-[#f5f4f0] border border-[#d4d2ca] shadow-sm">
        
        {/* ==================================================================== */}
        {/* LANDING PAGE NAVBAR (VISIBLE ONLY ON LANDING PAGE)                   */}
        {/* ==================================================================== */}
        <header className="border-b border-[#d4d2ca] bg-[#f5f4f0] px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#e53924]" />
            <span className="font-condensed font-bold text-xl sm:text-2xl text-[#111111] tracking-wider uppercase">
              HERITAGEGUESS
            </span>
            <span className="hidden md:inline font-mono-tech text-[10px] text-[#737373] tracking-widest uppercase border-l border-[#d4d2ca] pl-3">
              ARCHIVAL GEOGRAPHY & VISION
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-1.5 font-mono-tech text-[10px] text-[#666666] tracking-wider uppercase bg-[#ffffff] border border-[#d4d2ca] px-2.5 py-1">
              <span className="w-1.5 h-1.5 bg-[#199900] rounded-full animate-pulse" />
              <span>100% OPEN SOURCE</span>
            </div>

            <button
              onClick={() => setShowAboutModal(true)}
              className="font-mono-tech text-xs tracking-wider uppercase border border-[#111111] bg-[#ffffff] hover:bg-[#111111] hover:text-[#ffffff] px-3 sm:px-4 py-1.5 transition-colors cursor-pointer"
            >
              ABOUT
            </button>

            <button
              onClick={begin}
              disabled={!hydrated || busy}
              className="btn-brutalist-black text-xs px-3 sm:px-4 py-1.5 hidden sm:inline-flex"
            >
              <span>{busy ? "STARTING…" : "EXPEDITION"}</span>
              <span className="text-[#e53924]">→</span>
            </button>
          </div>
        </header>
        
        {/* ==================================================================== */}
        {/* HERO SECTION                                                         */}
        {/* ==================================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#d4d2ca]">
          
          {/* Left Column: Towering Typography & Action */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#d4d2ca]">
            {/* Rotated Vertical Meta Tag on left edge */}
            <div className="hidden sm:block absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
              <span className="font-mono-tech text-[9px] tracking-[0.25em] text-[#888888] uppercase select-none">
                HISTORICAL GEOGRAPHY & ARCHIVAL DISCOVERY
              </span>
            </div>

            <div className="sm:pl-6">
              {/* Massive Condensed Headline */}
              <h1 className="font-condensed font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight text-[#111111] uppercase leading-[0.88] m-0">
                INTELLIGENCE,<br />
                DESIGNED<br />
                FOR REAL WORK<span className="text-[#e53924]">.</span>
              </h1>

              {/* Taxonomy / Meta Sub-title */}
              <div className="flex items-center gap-2 mt-8 text-xs font-mono-tech tracking-[0.2em] uppercase font-semibold text-[#111111]">
                <span>AI</span>
                <span className="text-[#e53924]">✦</span>
                <span>VISION</span>
                <span className="text-[#e53924]">✦</span>
                <span>CARTOGRAPHY</span>
              </div>
            </div>

            {/* Bottom Metadata & Primary Button */}
            <div className="sm:pl-6 mt-12 sm:mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="font-mono-tech text-[10px] tracking-widest text-[#737373] uppercase leading-relaxed">
                HERITAGEGUESS<br />
                / HISTORICAL ARCHIVES<br />
                / 2026
              </div>

              <div>
                <button
                  className="btn-brutalist-black w-full sm:w-auto text-sm"
                  disabled={!hydrated || busy}
                  onClick={begin}
                >
                  <span>{busy ? "STARTING EXPEDITION…" : "START EXPEDITION"}</span>
                  <span className="text-[#e53924]">→</span>
                </button>
              </div>
            </div>

            {error && (
              <p className="mt-4 font-mono-tech text-xs text-[#e53924] bg-[#fdf2f0] p-2 border border-[#e53924]/30" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Right Column: Architectural Photography with Red Accent */}
          <div className="lg:col-span-5 relative bg-[#1c1c1c] min-h-[380px] sm:min-h-[460px] overflow-hidden flex flex-col justify-between p-6">
            {/* Top Index Marker */}
            <div className="flex justify-end">
              <span className="font-mono-tech text-[10px] tracking-widest text-[#f5f4f0]/80 bg-[#111111]/70 px-2 py-1 border border-[#f5f4f0]/20">
                001
              </span>
            </div>

            {/* Architectural Monument Graphic / Cutout */}
            <div className="relative my-auto flex items-center justify-center">
              {/* Main Grayscale Architectural Image */}
              <img
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Stone_Chariot_of_Vitthala_Temple_Hampi.jpg?width=1200"
                alt="Vitthala Temple stone architecture"
                className="w-full max-h-[320px] object-cover filter grayscale contrast-125 brightness-90 border border-[#444444]"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              
              {/* Vivid Red Accent Pane Box Overlay */}
              <div className="absolute right-4 top-8 w-24 h-32 sm:w-28 sm:h-36 bg-[#e53924]/90 border border-[#ffffff]/40 flex flex-col justify-between p-2 shadow-2xl backdrop-blur-xs">
                <span className="font-mono-tech text-[8px] tracking-widest text-[#ffffff] uppercase font-bold">
                  SURVEY
                </span>
                <span className="font-condensed font-bold text-xs text-[#ffffff] tracking-wider uppercase">
                  1880 PLATE
                </span>
              </div>
            </div>

            {/* Bottom Crosshair Telemetry */}
            <div className="flex justify-between items-end">
              <span className="font-mono-tech text-[9px] tracking-widest text-[#a3a3a3] uppercase">
                LAT: 15.3350° N · LNG: 76.4600° E
              </span>
              <Crosshair className="w-5 h-5 text-[#e53924]" />
            </div>
          </div>

        </section>

        {/* ==================================================================== */}
        {/* SECTION 01: MANIFESTO & SUMMARY STRIP                                */}
        {/* ==================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-b border-[#d4d2ca]">
          
          {/* Cell 1: 01 Index */}
          <div className="md:col-span-3 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#d4d2ca] flex items-center gap-4">
            <span className="font-condensed font-bold text-6xl text-[#111111] leading-none">
              01
            </span>
            <div className="h-8 w-[1px] bg-[#d4d2ca]" />
            <span className="font-mono-tech text-[9px] tracking-widest text-[#e53924] uppercase font-bold">
              ABOUT HERITAGEGUESS
            </span>
          </div>

          {/* Cell 2: Big Condensed Manifesto */}
          <div className="md:col-span-4 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#d4d2ca] flex items-center">
            <h2 className="font-condensed font-bold text-2xl sm:text-3xl text-[#111111] uppercase leading-tight m-0">
              WE BUILD SYSTEMS THAT MAKE HISTORICAL GEOGRAPHY FEEL IMMERSIVE.
            </h2>
          </div>

          {/* Cell 3: Technical Statement */}
          <div className="md:col-span-3 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#d4d2ca] flex flex-col justify-center">
            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-3">
              HeritageGuess is an AI-powered historical geography platform. We combine archival 19th-century photography, computer vision reasoning, and geodesic cartography to challenge how explorers observe and deduce ancient architecture.
            </p>
            <span className="font-mono-tech text-[9px] tracking-wider text-[#111111] uppercase font-bold">
              WE COMBINE ARCHIVAL PLATES, AI REASONING, AND GEOGRAPHIC PRECISION.
            </span>
          </div>

          {/* Cell 4: Location Badge & Crosshair */}
          <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between items-start bg-[#f0eee6]">
            <div className="font-mono-tech text-[9px] tracking-widest text-[#737373] uppercase leading-tight">
              BASED IN INDIA<br />
              EXPLORED GLOBALLY
            </div>
            <div className="mt-6 self-end">
              <Crosshair className="w-5 h-5 text-[#e53924]" />
            </div>
          </div>

        </section>

        {/* ==================================================================== */}
        {/* SECTION: WHAT WE INVESTIGATE (MODULAR SERVICE ROWS)                  */}
        {/* ==================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-b border-[#d4d2ca]">
          
          {/* Left Column Label */}
          <div className="md:col-span-2 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#d4d2ca] flex md:flex-col justify-between">
            <span className="font-mono-tech text-[10px] tracking-widest text-[#e53924] uppercase font-bold">
              WHAT WE DO
            </span>
            <div className="hidden md:block font-mono-tech text-[9px] tracking-widest text-[#888888] uppercase">
              EXPEDITION MODULES
            </div>
          </div>

          {/* Right Column: Tabular 6 Rows */}
          <div className="md:col-span-10 divide-y divide-[#d4d2ca]">
            
            {/* Row 01 */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-[#eceae2] transition-colors">
              <div className="sm:col-span-1 font-condensed font-bold text-2xl text-[#111111]">
                01
              </div>
              <div className="sm:col-span-5 font-condensed font-bold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                ROCK-CUT TEMPLE ARCHITECTURE
              </div>
              <div className="sm:col-span-4 text-xs text-[#555555]">
                Analyzing monolithic cliff excavations, chaityas, and viharas across Deccan India.
              </div>
              <div className="sm:col-span-2 text-right font-mono-tech text-[10px] tracking-widest text-[#888888]">
                EXP / 01 <span className="text-[#e53924]">+</span>
              </div>
            </div>

            {/* Row 02 */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-[#eceae2] transition-colors">
              <div className="sm:col-span-1 font-condensed font-bold text-2xl text-[#111111]">
                02
              </div>
              <div className="sm:col-span-5 font-condensed font-bold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                VIJAYANAGARA & HAMPI CIVILIZATION
              </div>
              <div className="sm:col-span-4 text-xs text-[#555555]">
                Deciphering mandapas, musical pillars, and stone chariots from 1880s survey plates.
              </div>
              <div className="sm:col-span-2 text-right font-mono-tech text-[10px] tracking-widest text-[#888888]">
                EXP / 02 <span className="text-[#e53924]">+</span>
              </div>
            </div>

            {/* Row 03 */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-[#eceae2] transition-colors">
              <div className="sm:col-span-1 font-condensed font-bold text-2xl text-[#111111]">
                03
              </div>
              <div className="sm:col-span-5 font-condensed font-bold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                MUGHAL & RAJPUT FORTS
              </div>
              <div className="sm:col-span-4 text-xs text-[#555555]">
                Examining jharokhas, cusped arches, and sandstone bastions from historical surveys.
              </div>
              <div className="sm:col-span-2 text-right font-mono-tech text-[10px] tracking-widest text-[#888888]">
                EXP / 03 <span className="text-[#e53924]">+</span>
              </div>
            </div>

            {/* Row 04 */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-[#eceae2] transition-colors">
              <div className="sm:col-span-1 font-condensed font-bold text-2xl text-[#111111]">
                04
              </div>
              <div className="sm:col-span-5 font-condensed font-bold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                ANCIENT STEPWELLS & BAOLIS
              </div>
              <div className="sm:col-span-4 text-xs text-[#555555]">
                Mapping subterranean water architecture, geometric pavilions, and stone staircases.
              </div>
              <div className="sm:col-span-2 text-right font-mono-tech text-[10px] tracking-widest text-[#888888]">
                EXP / 04 <span className="text-[#e53924]">+</span>
              </div>
            </div>

            {/* Row 05 */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-[#eceae2] transition-colors">
              <div className="sm:col-span-1 font-condensed font-bold text-2xl text-[#111111]">
                05
              </div>
              <div className="sm:col-span-5 font-condensed font-bold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                AI VISION INVESTIGATION
              </div>
              <div className="sm:col-span-4 text-xs text-[#555555]">
                Progressive architectural deduction without leaking location names or coordinates.
              </div>
              <div className="sm:col-span-2 text-right font-mono-tech text-[10px] tracking-widest text-[#888888]">
                EXP / 05 <span className="text-[#e53924]">+</span>
              </div>
            </div>

            {/* Row 06 */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-[#eceae2] transition-colors">
              <div className="sm:col-span-1 font-condensed font-bold text-2xl text-[#111111]">
                06
              </div>
              <div className="sm:col-span-5 font-condensed font-bold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                GEODESIC PINPOINT ACCURACY
              </div>
              <div className="sm:col-span-4 text-xs text-[#555555]">
                Mathematical calculation of geodesic deviation and exponential proximity scoring.
              </div>
              <div className="sm:col-span-2 text-right font-mono-tech text-[10px] tracking-widest text-[#888888]">
                EXP / 06 <span className="text-[#e53924]">+</span>
              </div>
            </div>

          </div>

        </section>

        {/* ==================================================================== */}
        {/* SECTION: VISUAL BENTO GALLERY & TELEMETRY MATRIX                    */}
        {/* ==================================================================== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#d4d2ca]">
          
          {/* Bento Cell 1: High Contrast Architectural Geometry */}
          <div className="p-4 border-b sm:border-b-0 sm:border-r border-[#d4d2ca] bg-[#111111] text-[#ffffff] flex flex-col justify-between min-h-[260px] relative overflow-hidden">
            <div className="flex justify-between font-mono-tech text-[9px] tracking-widest text-[#a3a3a3]">
              <span>PLATE_01</span>
              <span>HAMPI</span>
            </div>
            <div className="my-4 relative">
              <div className="w-6 h-28 bg-[#e53924] absolute left-2 top-2" />
              <img
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Stone_Chariot_of_Vitthala_Temple_Hampi.jpg?width=1200"
                alt="Architectural details"
                className="w-full h-36 object-cover filter grayscale contrast-150 ml-4 border border-[#444444]"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <span className="font-condensed text-xs uppercase tracking-wider text-[#a3a3a3]">
              STONE MANTAPA STRUCTURE
            </span>
          </div>

          {/* Bento Cell 2: CAD Wireframe / AI Telemetry */}
          <div className="p-4 border-b sm:border-b-0 lg:border-r border-[#d4d2ca] bg-[#181818] text-[#ffffff] flex flex-col justify-between min-h-[260px]">
            <div className="flex justify-between font-mono-tech text-[9px] tracking-widest text-[#888888]">
              <span>AI_TELEMETRY</span>
              <span className="text-[#e53924]">78% MATCH</span>
            </div>
            <div className="p-4 my-2 border border-[#333333] bg-[#111111] font-mono-tech text-[10px] text-[#888888] space-y-1">
              <p className="text-[#e53924] font-bold">ARC_DETECTION: POSITIVE</p>
              <p>ROOFLINE: MULTI-TIER DRAVIDIAN</p>
              <p>WEATHERING: C. 1880 DEEN DAYAL</p>
              <p>COORD_DELTA: 14.8 KM</p>
            </div>
            <span className="font-condensed text-xs uppercase tracking-wider text-[#888888]">
              COMPUTER VISION ANALYSIS
            </span>
          </div>

          {/* Bento Cell 3: Clean Monolithic Carved Artefact */}
          <div className="p-4 border-b sm:border-b-0 sm:border-r border-[#d4d2ca] bg-[#e8e6df] text-[#111111] flex flex-col justify-between min-h-[260px]">
            <div className="flex justify-between font-mono-tech text-[9px] tracking-widest text-[#737373]">
              <span>SURVEY_SPEC</span>
              <span>CARVING</span>
            </div>
            <div className="py-6 text-center">
              <div className="w-16 h-24 mx-auto border-2 border-[#111111] bg-[#d8d6ce] flex items-center justify-center font-condensed font-bold text-2xl">
                VIT
              </div>
            </div>
            <span className="font-condensed text-xs uppercase tracking-wider text-[#111111]">
              MONOLITHIC BASALT ARCHAEOLOGY
            </span>
          </div>

          {/* Bento Cell 4: Topographical Landscape with Red Target */}
          <div className="p-4 bg-[#111111] text-[#ffffff] flex flex-col justify-between min-h-[260px] relative">
            <div className="flex justify-between font-mono-tech text-[9px] tracking-widest text-[#a3a3a3]">
              <span>TERRAIN_MAP</span>
              <Crosshair className="w-4 h-4 text-[#e53924]" />
            </div>
            <div className="my-auto text-center relative py-6">
              <div className="w-12 h-12 bg-[#e53924] mx-auto flex items-center justify-center font-mono-tech font-bold text-sm text-[#ffffff]">
                PIN
              </div>
            </div>
            <span className="font-condensed text-xs uppercase tracking-wider text-[#a3a3a3]">
              CARTOGRAPHIC PROJECTION
            </span>
          </div>

        </section>

        {/* ==================================================================== */}
        {/* SECTION: OUR PROCESS (3 LINEAR BOXES WITH ARROWS)                    */}
        {/* ==================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-b border-[#d4d2ca]">
          
          <div className="md:col-span-2 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#d4d2ca]">
            <span className="font-mono-tech text-[10px] tracking-widest text-[#e53924] uppercase font-bold">
              OUR PROCESS
            </span>
          </div>

          <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d4d2ca]">
            
            {/* Step 01 */}
            <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[200px]">
              <div>
                <div className="font-condensed font-bold text-4xl text-[#111111] mb-2 flex items-center justify-between">
                  <span>01</span>
                  <span className="text-xl text-[#737373]">→</span>
                </div>
                <h3 className="font-condensed font-bold text-2xl text-[#111111] uppercase tracking-wide mb-2">
                  INVESTIGATE
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Question visible architectural clues, rooflines, and weathering with the AI assistant without leaking location secrets.
                </p>
              </div>
              <span className="font-mono-tech text-[9px] tracking-widest text-[#888888] mt-4">
                STEP / 01
              </span>
            </div>

            {/* Step 02 */}
            <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[200px]">
              <div>
                <div className="font-condensed font-bold text-4xl text-[#111111] mb-2 flex items-center justify-between">
                  <span>02</span>
                  <span className="text-xl text-[#737373]">→</span>
                </div>
                <h3 className="font-condensed font-bold text-2xl text-[#111111] uppercase tracking-wide mb-2">
                  PINPOINT
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Calibrate your geographic reasoning and drop your pin upon the full-screen topographical map of the Indian subcontinent.
                </p>
              </div>
              <span className="font-mono-tech text-[9px] tracking-widest text-[#888888] mt-4">
                STEP / 02
              </span>
            </div>

            {/* Step 03 */}
            <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[200px]">
              <div>
                <div className="font-condensed font-bold text-4xl text-[#111111] mb-2">
                  03
                </div>
                <h3 className="font-condensed font-bold text-2xl text-[#111111] uppercase tracking-wide mb-2">
                  REVEAL
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Calculate geodesic distance error, claim your expedition points, and explore curated architectural slide chronicles.
                </p>
              </div>
              <span className="font-mono-tech text-[9px] tracking-widest text-[#888888] mt-4">
                STEP / 03
              </span>
            </div>

          </div>

        </section>

        {/* ==================================================================== */}
        {/* SECTION: WHY HERITAGEGUESS (5 PILLARS WITH BIG NUMERAL 5)            */}
        {/* ==================================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-b border-[#d4d2ca]">
          
          <div className="md:col-span-2 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#d4d2ca]">
            <span className="font-mono-tech text-[10px] tracking-widest text-[#e53924] uppercase font-bold">
              WHY HERITAGEGUESS
            </span>
          </div>

          <div className="md:col-span-2 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#d4d2ca] flex items-center justify-center bg-[#f0eee6]">
            <span className="font-condensed font-bold text-8xl text-[#d4d2ca]/70 select-none">
              5
            </span>
          </div>

          <div className="md:col-span-8 p-6 sm:p-8 divide-y divide-[#d4d2ca]/60">
            
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-condensed font-bold text-base text-[#111111] tracking-wide uppercase">
                <span className="text-[#e53924] mr-2">01</span> PURPOSE-FIRST GEOGRAPHY
              </span>
              <span className="text-xs text-[#666666]">
                Built with historical rigor and archaeological evidence, not random guessing.
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-condensed font-bold text-base text-[#111111] tracking-wide uppercase">
                <span className="text-[#e53924] mr-2">02</span> AI VISION + PROMPT SHIELDS
              </span>
              <span className="text-xs text-[#666666]">
                Intelligent vision reasoning helping you observe without spoiling monument names.
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-condensed font-bold text-base text-[#111111] tracking-wide uppercase">
                <span className="text-[#e53924] mr-2">03</span> AUTHENTIC ARCHIVAL PLATES
              </span>
              <span className="text-xs text-[#666666]">
                Genuine 19th-century photographs from Lala Deen Dayal and imperial surveys.
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-condensed font-bold text-base text-[#111111] tracking-wide uppercase">
                <span className="text-[#e53924] mr-2">04</span> MATHEMATICAL PRECISION
              </span>
              <span className="text-xs text-[#666666]">
                Exact Haversine geodesic formulas computing real kilometer deviations.
              </span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-condensed font-bold text-base text-[#111111] tracking-wide uppercase">
                <span className="text-[#e53924] mr-2">05</span> ARCHITECTURAL PRESERVATION
              </span>
              <span className="text-xs text-[#666666]">
                Preserving public knowledge of threatened, ancient, and rock-cut heritage.
              </span>
            </div>

          </div>

        </section>

        {/* ==================================================================== */}
        {/* FINAL HERO CTA: "BUILD WHAT YOUR BUSINESS ACTUALLY NEEDS."           */}
        {/* Transformed into: "TEST WHAT YOUR HISTORICAL INTUITION CAN SOLVE."   */}
        {/* ==================================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Big Bold Final Headline */}
          <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[#d4d2ca] flex flex-col justify-between">
            <h2 className="font-condensed font-bold text-4xl sm:text-5xl md:text-6xl text-[#111111] uppercase leading-[0.9] m-0">
              TEST WHAT<br />
              YOUR HISTORICAL<br />
              EYE CAN SOLVE<span className="text-[#e53924]">.</span>
            </h2>

            <div className="mt-8 font-mono-tech text-[10px] text-[#737373] tracking-widest uppercase">
              INVESTIGATE • PINPOINT • REVEAL
            </div>
          </div>

          {/* Architectural Cutout with Big Centered Button */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#111111] text-[#ffffff] flex flex-col justify-center items-center relative min-h-[240px] border-b lg:border-b-0 lg:border-r border-[#d4d2ca]">
            <div className="w-16 h-1 bg-[#e53924] mb-6" />
            <button
              className="btn-brutalist-black border border-[#ffffff] text-xs sm:text-sm tracking-[0.2em]"
              disabled={!hydrated || busy}
              onClick={begin}
            >
              <span>{busy ? "STARTING…" : "START EXPEDITION"}</span>
              <span className="text-[#e53924]">→</span>
            </button>
            <div className="mt-4 font-mono-tech text-[9px] text-[#777777] tracking-widest uppercase">
              5 MONUMENTS · ZERO TIMEOUTS
            </div>
          </div>

          {/* Right Column: Mission Mark */}
          <div className="lg:col-span-2 p-6 sm:p-8 bg-[#f0eee6] flex flex-col justify-between items-start">
            <div className="font-mono-tech text-[9px] tracking-widest text-[#737373] uppercase leading-tight">
              LET&apos;S REDISCOVER<br />
              SOMETHING<br />
              TIMELESS.
            </div>
            <div className="mt-8 self-end">
              <Crosshair className="w-6 h-6 text-[#e53924]" />
            </div>
          </div>

        </section>

      </div>

      {/* ==================================================================== */}
      {/* ABOUT & OPEN SOURCE MANIFESTO MODAL                                   */}
      {/* ==================================================================== */}
      {showAboutModal && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setShowAboutModal(false)}
        >
          <div
            className="bg-[#f5f4f0] border-2 border-[#111111] max-w-3xl w-full p-6 sm:p-8 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#d4d2ca] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#e53924]" />
                <span className="font-mono-tech text-xs font-bold text-[#111111] tracking-widest uppercase">
                  ABOUT HERITAGEGUESS // OPEN SOURCE MANIFESTO
                </span>
              </div>
              <button
                onClick={() => setShowAboutModal(false)}
                className="font-mono-tech text-xs font-bold hover:text-[#e53924] p-1 cursor-pointer"
              >
                [✕ CLOSE]
              </button>
            </div>

            {/* Mission & Audience Section */}
            <div className="mb-8">
              <span className="font-mono-tech text-[10px] text-[#e53924] font-bold tracking-widest uppercase">
                01 / THE MISSION & AUDIENCE
              </span>
              <h3 className="font-condensed font-bold text-2xl sm:text-3xl text-[#111111] uppercase tracking-wide mt-1 mb-3">
                MAKING ANCIENT WORLD HERITAGE ADDICTIVE FOR DIGITAL NATIVES.
              </h3>
              <p className="text-sm sm:text-base text-[#444444] leading-relaxed mb-3">
                Ancient history and archaeological heritage are too often confined to dry textbook chapters and passive museum displays. HeritageGuess reframes cultural education for <strong className="text-[#111111]">younger audiences (Gen Z and digital natives)</strong> as an interactive, high-stakes geographic investigation.
              </p>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                By pairing authentic 19th-century survey plates with AI-guided observation and full-screen cartographic deduction, players develop genuine spatial intuition for global ancient civilizations—from monolithic Dravidian rock-cut temples to Mughal fortresses and ancient subterranean stepwells.
              </p>
            </div>

            {/* Open Source Ecosystem Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between border-b border-[#d4d2ca] pb-2 mb-4">
                <span className="font-mono-tech text-[10px] text-[#e53924] font-bold tracking-widest uppercase">
                  02 / PROUDLY POWERED BY OPEN SOURCE
                </span>
                <span className="font-mono-tech text-[10px] text-[#199900] font-bold tracking-widest uppercase">
                  100% OPEN ECOSYSTEM
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Item 1 */}
                <div className="bg-[#ffffff] border border-[#d4d2ca] p-3.5">
                  <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#111111] font-bold mb-1">
                    <span>OPENSTREETMAP</span>
                    <span className="text-[#199900]">FREE MAPS</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-normal">
                    Free, community-governed planetary cartography. No corporate surveillance or proprietary map lock-in.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="bg-[#ffffff] border border-[#d4d2ca] p-3.5">
                  <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#111111] font-bold mb-1">
                    <span>LEAFLET & REACT-LEAFLET</span>
                    <span className="text-[#199900]">MAPPING ENGINE</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-normal">
                    The premier open-source JavaScript interactive mapping library, lightweight and hardware accelerated.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="bg-[#ffffff] border border-[#d4d2ca] p-3.5">
                  <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#111111] font-bold mb-1">
                    <span>WIKIMEDIA COMMONS</span>
                    <span className="text-[#199900]">PUBLIC ARCHIVES</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-normal">
                    Archival 19th-century photographic plates preserved under open Public Domain and Creative Commons licenses.
                  </p>
                </div>

                {/* Item 4 */}
                <div className="bg-[#ffffff] border border-[#d4d2ca] p-3.5">
                  <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#111111] font-bold mb-1">
                    <span>META LLAMA 3.3</span>
                    <span className="text-[#199900]">OPEN WEIGHTS</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-normal">
                    Open-weights frontier reasoning model delivering real-time architectural visual deduction via the Groq LPU engine.
                  </p>
                </div>

                {/* Item 5 */}
                <div className="bg-[#ffffff] border border-[#d4d2ca] p-3.5">
                  <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#111111] font-bold mb-1">
                    <span>NEXT.JS 16 & REACT 19</span>
                    <span className="text-[#199900]">OPEN FRAMEWORK</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-normal">
                    Modern open-source React application framework with Turbopack and partial prefetching.
                  </p>
                </div>

                {/* Item 6 */}
                <div className="bg-[#ffffff] border border-[#d4d2ca] p-3.5">
                  <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#111111] font-bold mb-1">
                    <span>TAILWIND CSS V4</span>
                    <span className="text-[#199900]">STYLING ENGINE</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-normal">
                    Zero-runtime utility engine delivering the custom editorial brutalist architectural design system.
                  </p>
                </div>
              </div>
            </div>

            {/* Mathematical & Anti-Cheat Summary */}
            <div className="p-4 bg-[#eae8e1] border border-[#d4d2ca] font-mono-tech text-[11px] text-[#444444] space-y-1 mb-6">
              <div className="text-[#111111] font-bold uppercase">CRYPTOGRAPHIC & GEODESIC ARCHITECTURE</div>
              <div>• Mathematical distance calculated via the Haversine great-circle formula.</div>
              <div>• Zero client location leaks: sessions signed with server-side HMAC-SHA256 tokens.</div>
              <div>• AI guardrails prevent prompt injection and coding off-topic queries.</div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#d4d2ca]">
              <span className="font-mono-tech text-[10px] text-[#737373] tracking-widest uppercase">
                HERITAGEGUESS // MIT LICENSE
              </span>
              <button
                onClick={() => setShowAboutModal(false)}
                className="btn-brutalist-black w-full sm:w-auto text-xs px-6 py-2"
              >
                RETURN TO EXPEDITIONS
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
