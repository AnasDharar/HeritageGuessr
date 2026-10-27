import { NextResponse } from "next/server";
import { locationFromToken } from "@/lib/game-session";
import { distanceKm, scoreForDistance, validCoordinates } from "@/lib/scoring";
import type { Guess } from "@/lib/types";

export async function POST(request: Request) {
  let body: { token?: unknown; guess?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const location = locationFromToken(body.token);
  const guess = body.guess as Guess;
  if (!location || !guess || !validCoordinates(guess)) return NextResponse.json({ error: "Invalid round or coordinates." }, { status: 400 });
  const distance = distanceKm(guess, location.coordinates); const score = scoreForDistance(distance);
  return NextResponse.json({ guess, distance, score, location: { name: location.name, location: location.location, year: location.year, description: location.description, coordinates: location.coordinates, "slide-data": location["slide-data"] } });
}
