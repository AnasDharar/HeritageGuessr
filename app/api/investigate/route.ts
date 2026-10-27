import { NextResponse } from "next/server";
import { locationFromToken } from "@/lib/game-session";

const fallback =
  "I cannot inspect the photograph directly, but try comparing silhouettes, arches, building materials, vegetation, and the relationship between the structure and its landscape.";

export async function POST(request: Request) {
  let body: { token?: unknown; messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const location = locationFromToken(body.token);
  if (!location || !Array.isArray(body.messages) || body.messages.length > 12) {
    return NextResponse.json({ error: "Invalid investigation." }, { status: 400 });
  }

  const messages = body.messages.filter(
    (m): m is { role: "user" | "assistant"; text: string } =>
      typeof m === "object" &&
      m !== null &&
      ((m as { role?: unknown }).role === "user" ||
        (m as { role?: unknown }).role === "assistant") &&
      typeof (m as { text?: unknown }).text === "string" &&
      (m as { text: string }).text.length <= 500
  );

  if (!messages.length) {
    return NextResponse.json({ error: "Add a question first." }, { status: 400 });
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ text: fallback, source: "fallback" });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.35,
        max_tokens: 160,
        messages: [
          {
            role: "system",
            content:
              "You are a careful historical-photo investigation assistant. You must NEVER identify, name, confirm, or hint at the specific monument name, location name, city, state, country, or coordinates. Help the player observe architectural elements (such as stonework, pillars, arches, carvings) and landscape contexts without giving away the answer.",
          },
          ...messages.map((m) => ({ role: m.role, content: m.text })),
        ],
      }),
    });

    if (!response.ok) throw new Error("Groq API error");

    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    let reply = data.choices?.[0]?.message?.content?.trim() || fallback;

    // Safety Redaction: Ensure the AI response never leaks the location or monument name even if prompted
    const forbiddenWords = [
      location.name,
      location.location,
      ...location.location.split(",").map((s) => s.trim()),
    ].filter((s) => s && s.length > 2);

    for (const term of forbiddenWords) {
      const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      reply = reply.replace(regex, "[REDACTED]");
    }

    return NextResponse.json({ text: reply, source: "ai" });
  } catch {
    return NextResponse.json({ text: fallback, source: "fallback" });
  }
}
