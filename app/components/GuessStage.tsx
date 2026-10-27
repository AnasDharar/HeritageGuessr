"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Guess } from "@/lib/types";
import { useGameStore, type RoundResult } from "./GameStore";

const GuessMap = dynamic(() => import("./GuessMap"), {
  ssr: false,
  loading: () => <div className="map-loading full-map">Loading map…</div>,
});

export default function GuessStage() {
  const params = useParams<{ roundId: string }>();
  const router = useRouter();
  const { get, hydrated, setPin, saveResult } = useGameStore();
  const round = get(params.roundId);
  const [busy, setBusy] = useState(false);
  const submitted = useRef(false);

  useEffect(() => {
    if (hydrated && !round) router.replace("/");
  }, [hydrated, round, router]);

  if (!hydrated || !round) return <div className="map-loading full-map">Loading map…</div>;

  if (round.submitted) {
    router.replace(`/play/${round.id}/reveal`);
    return null;
  }

  const submit = async () => {
    if (!round.pin || busy || submitted.current) return;
    submitted.current = true;
    setBusy(true);
    try {
      const response = await fetch("/api/game/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: round.token, guess: round.pin }),
      });
      const data = (await response.json()) as RoundResult | { error: string };
      if (!response.ok) throw new Error("error" in data ? data.error : "Submission failed");
      saveResult(round.id, data as RoundResult);
      router.replace(`/play/${round.id}/reveal`);
    } catch {
      submitted.current = false;
      setBusy(false);
    }
  };

  return (
    <main className="guess-stage">
      <GuessMap
        value={round.pin ?? null}
        onPick={(pin: Guess) => setPin(round.id, pin)}
        locked={false}
      />
      <section className="map-overlay">
        <p className="eyebrow">FINAL GUESS</p>
        <h2>Place your pin</h2>
        <p>
          {round.pin
            ? "Pin selected. Click anywhere to move it before submitting."
            : "Click the map to place your pin."}
        </p>
        {round.pin && (
          <code>
            {round.pin.latitude.toFixed(4)}, {round.pin.longitude.toFixed(4)}
          </code>
        )}
        <button className="primary" disabled={!round.pin || busy} onClick={submit}>
          {busy ? "Submitting…" : "Submit guess"}
        </button>
        <button onClick={() => router.push(`/play/${round.id}`)} disabled={busy}>
          Back to investigation
        </button>
      </section>
    </main>
  );
}
