"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import type { Guess, StorySlide } from "@/lib/types";

export type PublicRound = {
  id: string;
  token: string;
  photoUrl: string;
  year: number;
  difficulty: string;
  pin?: Guess;
  submitted?: boolean;
  chat: ChatMessage[];
  result?: RoundResult;
};

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export type RoundResult = {
  guess: Guess;
  distance: number;
  score: number;
  location: {
    name: string;
    location: string;
    year: number;
    description: string;
    coordinates: Guess;
    "slide-data": StorySlide[];
  };
};

type Store = {
  rounds: PublicRound[];
  hydrated: boolean;
  start: () => Promise<PublicRound | null>;
  get: (id: string) => PublicRound | undefined;
  setPin: (id: string, pin: Guess) => void;
  addChat: (id: string, message: ChatMessage) => void;
  saveResult: (id: string, result: RoundResult) => void;
  next: (id: string) => PublicRound | undefined;
  total: number;
  reset: () => void;
};

const Context = createContext<Store | null>(null);
const KEY = "heritageguess-routes-v2";

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
  const [rounds, setRounds] = useState<PublicRound[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          setRounds(JSON.parse(raw) as PublicRound[]);
        }
      } catch {} finally {
        setHydrated(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setPin = useCallback((id: string, pin: Guess) => {
    setRounds((prev) => {
      const nextRounds = prev.map((r) => (r.id === id && !r.submitted ? { ...r, pin } : r));
      try {
        localStorage.setItem(KEY, JSON.stringify(nextRounds));
      } catch {}
      return nextRounds;
    });
  }, []);

  const addChat = useCallback((id: string, message: ChatMessage) => {
    setRounds((prev) => {
      const nextRounds = prev.map((r) =>
        r.id === id ? { ...r, chat: [...(r.chat || []), message] } : r
      );
      try {
        localStorage.setItem(KEY, JSON.stringify(nextRounds));
      } catch {}
      return nextRounds;
    });
  }, []);

  const saveResult = useCallback((id: string, result: RoundResult) => {
    setRounds((prev) => {
      const nextRounds = prev.map((r) =>
        r.id === id && !r.submitted ? { ...r, submitted: true, result } : r
      );
      try {
        localStorage.setItem(KEY, JSON.stringify(nextRounds));
      } catch {}
      return nextRounds;
    });
  }, []);

  const start = useCallback(async () => {
    const response = await fetch("/api/game/start", { method: "POST" });
    if (!response.ok) return null;
    const data = (await response.json()) as { rounds?: PublicRound[] };
    const fresh = (data.rounds ?? []).map((r) => ({ ...r, chat: [] }));
    setRounds(fresh);
    try {
      localStorage.setItem(KEY, JSON.stringify(fresh));
    } catch {}
    return fresh[0] ?? null;
  }, []);

  const reset = useCallback(() => {
    setRounds([]);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }, []);

  const total = useMemo(
    () => rounds.reduce((sum, r) => sum + (r.result?.score ?? 0), 0),
    [rounds]
  );

  const get = useCallback((id: string) => rounds.find((r) => r.id === id), [rounds]);

  const next = useCallback(
    (id: string) => {
      const index = rounds.findIndex((r) => r.id === id);
      return index >= 0 ? rounds[index + 1] : undefined;
    },
    [rounds]
  );

  const value = useMemo<Store>(
    () => ({
      rounds,
      hydrated,
      total,
      get,
      start,
      setPin,
      addChat,
      saveResult,
      next,
      reset,
    }),
    [rounds, hydrated, total, get, start, setPin, addChat, saveResult, next, reset]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useGameStore() {
  const store = useContext(Context);
  if (!store) throw new Error("Game store missing");
  return store;
}
