import type { Guess } from "./types";

export const MAX_SCORE = 5000;
const EARTH_RADIUS_KM = 6371;

export function validCoordinates(point: Guess): boolean {
  return Number.isFinite(point.latitude) && Number.isFinite(point.longitude) &&
    Math.abs(point.latitude) <= 90 && Math.abs(point.longitude) <= 180;
}

export function distanceKm(a: Guess, b: Guess): number {
  if (!validCoordinates(a) || !validCoordinates(b)) return Number.POSITIVE_INFINITY;
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latDelta = radians(b.latitude - a.latitude);
  const lonDelta = radians(b.longitude - a.longitude);
  const haversine = Math.sin(latDelta / 2) ** 2 +
    Math.cos(radians(a.latitude)) * Math.cos(radians(b.latitude)) * Math.sin(lonDelta / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

/** 5,000 × e^(-distance / 2,000), rounded; invalid or extremely distant guesses score 0. */
export function scoreForDistance(distance: number): number {
  if (!Number.isFinite(distance) || distance < 0 || distance > 20_000) return 0;
  return Math.max(0, Math.min(MAX_SCORE, Math.round(MAX_SCORE * Math.exp(-distance / 2000))));
}
