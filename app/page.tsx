"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGameStore } from "./components/GameStore";

/* -------------------------------------------------------------------------- */
/* Traditional Indian Stambha (Temple Pillar) Motif                           */
/* -------------------------------------------------------------------------- */
function IndianPillar({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 480"
      className="pillar-svg"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`goldPillarGrad-${flip ? "r" : "l"}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3d1" />
          <stop offset="40%" stopColor="#d4af37" />
          <stop offset="85%" stopColor="#8f6b1e" />
          <stop offset="100%" stopColor="#5c4411" />
        </linearGradient>
      </defs>

      {/* Crowning Kalash & Coconut Finial */}
      <path
        d="M60 8 C62 14, 66 22, 60 28 C54 22, 58 14, 60 8 Z"
        fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`}
      />
      <circle cx="60" cy="32" r="7" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />
      <path
        d="M45 42 C48 34, 54 34, 60 40 C66 34, 72 34, 75 42 C72 50, 48 50, 45 42 Z"
        fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`}
      />
      <path
        d="M40 52 C45 46, 75 46, 80 52 L84 62 C75 66, 45 66, 36 62 Z"
        fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`}
      />

      {/* Ornate Capital & Brackets */}
      <path
        d="M30 68 C45 64, 75 64, 90 68 L94 82 C82 86, 38 86, 26 82 Z"
        fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`}
      />
      <path
        d="M22 84 C38 88, 82 88, 98 84 C96 96, 88 102, 60 102 C32 102, 24 96, 22 84 Z"
        fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`}
      />

      {/* Chhattri / Multi-tier floral rings */}
      <ellipse cx="60" cy="112" rx="32" ry="7" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />
      <ellipse cx="60" cy="126" rx="28" ry="6" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />
      <ellipse cx="60" cy="138" rx="24" ry="5" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />

      {/* Main Fluted Pillar Shaft */}
      <rect x="42" y="146" width="36" height="190" rx="3" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} opacity="0.9" />
      <line x1="48" y1="146" x2="48" y2="336" stroke="#4a0610" strokeWidth="1.5" opacity="0.6" />
      <line x1="54" y1="146" x2="54" y2="336" stroke="#fff3d1" strokeWidth="1" opacity="0.7" />
      <line x1="60" y1="146" x2="60" y2="336" stroke="#4a0610" strokeWidth="1.5" opacity="0.6" />
      <line x1="66" y1="146" x2="66" y2="336" stroke="#fff3d1" strokeWidth="1" opacity="0.7" />
      <line x1="72" y1="146" x2="72" y2="336" stroke="#4a0610" strokeWidth="1.5" opacity="0.6" />

      {/* Pillar Middle Floral Band */}
      <rect x="38" y="235" width="44" height="12" rx="3" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />
      <circle cx="60" cy="241" r="3" fill="#4a0610" />
      <circle cx="48" cy="241" r="2" fill="#4a0610" />
      <circle cx="72" cy="241" r="2" fill="#4a0610" />

      {/* Pillar Shaft Base Rings */}
      <ellipse cx="60" cy="344" rx="26" ry="6" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />
      <ellipse cx="60" cy="356" rx="30" ry="7" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />

      {/* Ornate Plinth Base */}
      <path
        d="M30 366 C35 360, 85 360, 90 366 L98 400 C80 412, 40 412, 22 400 Z"
        fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`}
      />
      <path
        d="M40 378 C48 372, 54 384, 60 376 C66 384, 72 372, 80 378 C76 392, 44 392, 40 378 Z"
        fill="#3d050c"
      />
      <circle cx="60" cy="388" r="4" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />

      {/* Tiered Pedestal Footing */}
      <rect x="18" y="412" width="84" height="16" rx="3" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />
      <rect x="12" y="432" width="96" height="18" rx="3" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />
      <rect x="6" y="454" width="108" height="20" rx="4" fill={`url(#goldPillarGrad-${flip ? "r" : "l"})`} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Traditional Lotus / Mandala Divider Ornament                               */
/* -------------------------------------------------------------------------- */
function RoyalDivider({ title }: { title?: string }) {
  return (
    <div className="royal-divider-row" aria-hidden="true">
      <div className="royal-divider-line" />
      <span style={{ fontSize: "11px", color: "#d4af37" }}>❖</span>
      <svg viewBox="0 0 24 24" style={{ width: "20px", height: "20px", fill: "#d4af37" }}>
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
      {title && (
        <span
          className="font-cinzel"
          style={{
            fontSize: "0.78rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#f5e6be",
            fontWeight: 700,
            padding: "0 0.5rem",
          }}
        >
          {title}
        </span>
      )}
      <svg viewBox="0 0 24 24" style={{ width: "20px", height: "20px", fill: "#d4af37" }}>
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
      <span style={{ fontSize: "11px", color: "#d4af37" }}>❖</span>
      <div className="royal-divider-line-right" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Royal Indian Heritage Landing Page Component                               */
/* -------------------------------------------------------------------------- */
export default function Home() {
  const router = useRouter();
  const { start, hydrated } = useGameStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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
    <main className="royal-page-wrapper">
      {/* The Grand Royal Scroll / Invitation Card */}
      <article className="royal-scroll-card">
        
        {/* ================================================================= */}
        {/* SECTION 1: THE ROYAL CRIMSON HERO & MULTI-FOIL CUSPED ARCH        */}
        {/* ================================================================= */}
        <section className="pattern-crimson royal-hero-section">
          <div className="royal-hero-layout">
            
            {/* Left Stambha Pillar */}
            <div className="pillar-col">
              <IndianPillar />
            </div>

            {/* Central Grand Indian Cusped Arch Frame */}
            <div className="royal-arch-outer">
              <div className="royal-arch-inner">
                
                {/* Traditional Invocation */}
                <p className="royal-invocation">
                  ✦ शुभम् भवतु ✦<br />
                  <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", opacity: 0.9 }}>
                    An Expedition Into Sacred Geography
                  </span>
                </p>

                <div
                  style={{
                    width: "60px",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                    margin: "0 auto 1rem",
                  }}
                />

                {/* Formal Invitation Text */}
                <p className="royal-invitation-text">
                  You are cordially invited to rediscover the lost monuments, forgotten dynasties, and sacred landscapes of the subcontinent.
                </p>

                {/* Grand Golden Title */}
                <h1 className="royal-main-title">
                  HeritageGuess
                </h1>

                {/* Subtitle */}
                <p className="royal-subtitle">
                  The Imperial Archival Survey
                </p>

                {/* Primary Ornate Call to Action Button */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <button
                    className="btn-royal-investigation"
                    disabled={!hydrated || busy}
                    onClick={begin}
                  >
                    <span>❖</span>
                    <span>{busy ? "Preparing Expedition…" : "Start Investigation"}</span>
                    <span>❖</span>
                  </button>
                </div>

                {error && (
                  <p
                    style={{
                      marginTop: "1rem",
                      fontSize: "0.8rem",
                      color: "#f87171",
                      backgroundColor: "#450a0a",
                      padding: "0.5rem",
                      border: "1px solid rgba(248, 113, 113, 0.4)",
                      borderRadius: "4px",
                    }}
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Right Stambha Pillar */}
            <div className="pillar-col">
              <IndianPillar flip />
            </div>

          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 2: THE FOREST / EMERALD GREEN DURBAR (3 CORE PHASES)      */}
        {/* ================================================================= */}
        <section className="pattern-emerald royal-durbar-section">
          <RoyalDivider title="The Royal Expedition" />

          <div className="durbar-grid">
            <div className="durbar-card">
              <p className="durbar-phase">Phase I</p>
              <h2 className="durbar-title">The Investigation</h2>
              <div className="durbar-divider" />
              <p className="durbar-desc">
                Consult with the royal AI archivist. Scrutinize architectural silhouettes, weathered stonework, carved pillars, and regional geology without revealing the answer.
              </p>
            </div>

            <div className="durbar-card">
              <p className="durbar-phase">Phase II</p>
              <h2 className="durbar-title">The Sacred Pin</h2>
              <div className="durbar-divider" />
              <p className="durbar-desc">
                Survey the full-screen topographical cartography of India. Calibrate your historical deduction and drop your pin with geographic precision.
              </p>
            </div>

            <div className="durbar-card">
              <p className="durbar-phase">Phase III</p>
              <h2 className="durbar-title">The Revelation</h2>
              <div className="durbar-divider" />
              <p className="durbar-desc">
                Unveil the true site, claim your imperial score based on geodesic distance, and explore curated architectural slide chronicles.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: THE CHRONICLES & FRAMED ARCHIVAL SHOWCASE              */}
        {/* ================================================================= */}
        <section className="pattern-crimson royal-chronicles-section">
          <div className="chronicles-grid">
            
            <div className="chronicles-card">
              <div className="chronicles-inner">
                <p className="font-cinzel" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: "#d4af37", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Heritage Chronicles
                </p>
                <h3 className="font-cinzel" style={{ fontSize: "1.45rem", color: "#fcedc7", fontWeight: 700, marginBottom: "0.75rem" }}>
                  Echoes in Living Stone
                </h3>
                <p className="font-cormorant" style={{ fontSize: "1rem", color: "#f0e8dc", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  From the monolithic Kailasa temple carved from a single basalt mountain at Ellora, to the grand chariot mandapas of the Vijayanagara kings at Hampi, India&apos;s architectural legacy is etched across millennia.
                </p>
                <p className="font-cormorant" style={{ fontSize: "1rem", color: "#f0e8dc", lineHeight: 1.6, margin: 0 }}>
                  HeritageGuess immerses you into rare 19th-century photographs and archaeological surveys, inviting you to rediscover the timeless soul and geography of our monuments.
                </p>
              </div>
            </div>

            <div className="chronicles-card">
              <div style={{ border: "1px solid rgba(245, 230, 190, 0.6)", padding: "8px", backgroundColor: "#1c0205" }}>
                <img
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Stone_Chariot_of_Vitthala_Temple_Hampi.jpg?width=1200"
                  alt="Stone Chariot of Vitthala Temple at Hampi"
                  style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div style={{ padding: "0.75rem", textAlign: "center", backgroundColor: "#250308", borderTop: "1px solid rgba(212, 175, 55, 0.4)" }}>
                  <p className="font-cinzel" style={{ fontSize: "0.72rem", letterSpacing: "0.15em", color: "#d4af37", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>
                    Vitthala Temple Complex · Hampi
                  </p>
                  <p className="font-cormorant" style={{ fontSize: "0.85rem", color: "#c9bda5", fontStyle: "italic", margin: "0.2rem 0 0" }}>
                    Vijayanagara Empire, Karnataka · UNESCO World Heritage
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 4: THE OCHRE / MUSTARD ROYAL CARTOUCHE PLAQUE             */}
        {/* ================================================================= */}
        <section className="pattern-ochre royal-cartouche-section">
          <div className="royal-cartouche-box">
            <div className="royal-cartouche-inner">
              
              <div className="cartouche-badge">
                COMMENCE
              </div>

              <h4 className="font-cinzel" style={{ fontSize: "1.25rem", color: "#fcedc7", fontWeight: 700, margin: "0 0 0.5rem" }}>
                Are You Prepared to Explore?
              </h4>
              <p className="font-cormorant" style={{ fontSize: "0.95rem", color: "#e8ded0", lineHeight: 1.5, margin: "0 0 1.25rem" }}>
                Test your architectural discernment across historical monuments.
              </p>

              <button
                className="btn-royal-secondary"
                disabled={!hydrated || busy}
                onClick={begin}
              >
                {busy ? "Entering…" : "Begin Expedition"}
              </button>
            </div>
          </div>
        </section>

        {/* Footer Ribbon */}
        <footer style={{ backgroundColor: "#180205", padding: "1rem", textAlign: "center", borderTop: "1px solid rgba(212, 175, 55, 0.4)" }}>
          <p className="font-cinzel" style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "rgba(212, 175, 55, 0.8)", textTransform: "uppercase", margin: 0 }}>
            HeritageGuess · An Indian Historical Geography Experience
          </p>
        </footer>

      </article>
    </main>
  );
}
