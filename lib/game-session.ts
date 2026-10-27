import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import dataset from "@/images/data.json";
import { validCoordinates } from "./scoring";
import type { HeritageDataset, HeritageLocation } from "./types";

const locations = ((dataset as HeritageDataset).images ?? []).filter((item) => validCoordinates(item.coordinates) && Boolean(item.url));
const secret = process.env.GAME_SESSION_SECRET || "heritageguess-local-development-secret";

function signature(id: number) { return createHmac("sha256", secret).update(String(id)).digest("base64url"); }
export function issueRoundToken(location: HeritageLocation) { return `${location.id}.${signature(location.id)}`; }
export function locationFromToken(token: unknown): HeritageLocation | null {
  if (typeof token !== "string") return null;
  const [rawId, supplied] = token.split("."); const id = Number(rawId);
  if (!Number.isInteger(id) || !supplied) return null;
  const expected = signature(id);
  if (supplied.length !== expected.length || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return null;
  return locations.find((location) => location.id === id) ?? null;
}
export function playableLocations() { return locations; }
export function publicRound(location: HeritageLocation) {
  return { photoUrl: location.url, year: location.year, difficulty: location.difficulty };
}
