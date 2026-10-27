import { Suspense } from "react";
import FinalResults from "@/app/components/FinalResults";
export default function ResultsPage(){return <Suspense fallback={<main className="shell">Loading results…</main>}><FinalResults /></Suspense>}
