import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { issueRoundToken, playableLocations, publicRound } from "@/lib/game-session";

export async function POST() {
  const locations = [...playableLocations()].sort(() => Math.random() - 0.5);
  return NextResponse.json({ rounds: locations.map((location) => ({ id: randomUUID(), token: issueRoundToken(location), ...publicRound(location) })) });
}
