"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MAX_SCORE } from "@/lib/scoring";
import { useGameStore } from "./GameStore";
export default function StartGame(){const router=useRouter(),{start,hydrated}=useGameStore(),[busy,setBusy]=useState(false),[error,setError]=useState("");const begin=async()=>{setBusy(true);setError("");try{const round=await start();if(round)router.push(`/play/${round.id}`);else setError("No playable locations are available.")}catch{setError("Could not start the expedition. Please try again.")}finally{setBusy(false)}};return <main className="shell"><section className="card hero"><p className="eyebrow">HISTORICAL GEOGRAPHY GAME</p><h1>HeritageGuess</h1><p>Investigate historical photographs at your own pace, then make one final map guess for every location.</p><button className="primary" disabled={!hydrated||busy} onClick={begin}>{busy?"Starting…":"Start expedition"}</button>{error&&<p role="alert">{error}</p>}<p className="formula">Maximum score: {MAX_SCORE.toLocaleString()} per round. Score = {MAX_SCORE.toLocaleString()} × e<sup>−distance / 2,000 km</sup>.</p></section></main>}
