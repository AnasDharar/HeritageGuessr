import RevealStage from "@/app/components/RevealStage";
import { Suspense } from "react";
export default function RevealPage() { return <Suspense fallback={<main className="shell">Loading reveal…</main>}><RevealStage /></Suspense>; }
