import { NextResponse } from "next/server";

const fallback = ["Study silhouettes, rooflines, arches, and the relationship between structures and landscape.", "Look for building materials, carved details, pathways, water, vegetation, and signs of a ceremonial or civic setting.", "Compare the image's photographic era with the architecture: construction methods and weathering can offer useful regional clues."];

export async function POST(request: Request) {
  let body: { level?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const level = typeof body.level === "number" && Number.isInteger(body.level) && body.level >= 1 && body.level <= 3 ? body.level : 1;
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ clue: fallback[level - 1], source: "fallback" });
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile", temperature: 0.35, max_tokens: 90, messages: [
        { role: "system", content: "You are a historical-photo coach. You cannot see an image and must say nothing location-specific. Give one concise, progressive prompt helping a player observe architecture or environment. Never name or identify a place, predict coordinates, claim visual inspection, or invent facts." },
        { role: "user", content: `Give safe observation prompt ${level} of 3. The only available context is that it is an unanalysed historical photograph.` }
      ] })
    });
    if (!response.ok) throw new Error("Groq request failed");
    const data = await response.json() as { choices?: { message?: { content?: string } }[] };
    const clue = data.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ clue: clue || fallback[level - 1], source: clue ? "ai" : "fallback" });
  } catch { return NextResponse.json({ clue: fallback[level - 1], source: "fallback" }); }
}
