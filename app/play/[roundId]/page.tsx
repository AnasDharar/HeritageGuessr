import Investigation from "@/app/components/Investigation";
import { Suspense } from "react";
export default function InvestigationPage() { return <Suspense fallback={<main className="shell">Loading expedition…</main>}><Investigation /></Suspense>; }
