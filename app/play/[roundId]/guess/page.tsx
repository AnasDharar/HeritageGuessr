import GuessStage from "@/app/components/GuessStage";
import { Suspense } from "react";
export default function GuessPage() { return <Suspense fallback={<main className="shell">Loading map…</main>}><GuessStage /></Suspense>; }
