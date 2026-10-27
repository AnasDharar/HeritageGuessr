import { NextResponse } from "next/server";

type Payload = { name?: unknown; location?: unknown; year?: unknown; description?: unknown; slides?: unknown };
export async function POST(request: Request) {
  let body: Payload; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (typeof body.name !== "string" || typeof body.location !== "string" || typeof body.description !== "string" || !Array.isArray(body.slides) || body.name.length > 200 || body.description.length > 2000) return NextResponse.json({ error: "Invalid heritage context." }, { status: 400 });
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ text: null, source: "fallback" });
  const context = JSON.stringify({ name: body.name, location: body.location, year: body.year, description: body.description, slides: body.slides.slice(0, 8) });
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile", temperature: 0.2, max_tokens: 180, messages: [
      { role: "system", content: "Write a short, engaging heritage interpretation strictly from the supplied JSON. Do not add, infer, alter, or embellish factual claims. Preserve the meaning; do not mention URLs or captions. If insufficient, say so plainly." }, { role: "user", content: context }
    ] }) });
    if (!response.ok) throw new Error("Groq request failed");
    const data = await response.json() as { choices?: { message?: { content?: string } }[] };
    return NextResponse.json({ text: data.choices?.[0]?.message?.content?.trim() || null, source: "ai" });
  } catch { return NextResponse.json({ text: null, source: "fallback" }); }
}
