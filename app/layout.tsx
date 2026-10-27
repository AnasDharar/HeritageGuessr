import type { Metadata } from "next";
import "./globals.css";
import { GameStoreProvider } from "./components/GameStore";

export const metadata: Metadata = {
  title: "HeritageGuess | An Expedition into Historical Geography",
  description: "An AI-powered historical geography and architectural heritage game inspired by India's timeless monuments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#240508] text-[#f8f5ee]">
        <GameStoreProvider>{children}</GameStoreProvider>
      </body>
    </html>
  );
}
