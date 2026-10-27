import type { Metadata } from "next";
import "./globals.css";
import { GameStoreProvider } from "./components/GameStore";

export const metadata: Metadata = {
  title: "HeritageGuess | Historical Geography & Archival Discovery",
  description:
    "A brutalist, minimalist historical geography game combining archival 19th-century photography with AI vision and cartographic precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/leaflet/leaflet.css" />
      </head>
      <body className="min-h-full flex flex-col bg-[#f5f4f0] text-[#111111] font-sans antialiased">
        <GameStoreProvider>{children}</GameStoreProvider>
      </body>
    </html>
  );
}
