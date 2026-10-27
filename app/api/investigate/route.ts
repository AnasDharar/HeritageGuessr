import { NextResponse } from "next/server";
import { locationFromToken } from "@/lib/game-session";

const fallback =
  "I cannot inspect the photograph directly, but try comparing silhouettes, arches, building materials, vegetation, and the relationship between the structure and its landscape.";

const OFF_TOPIC_REFUSAL =
  "I can only assist with investigating the architectural and visual features of this historical photograph. Please ask questions about the structure, stonework, arches, rooflines, or terrain.";

const SYSTEM_PROMPT = `You are a specialized historical architectural investigation field assistant in an archaeology game.

STRICT OPERATIONAL DIRECTIVES:
1. SOLE PURPOSE: Your only purpose is to help the player observe and deduce clues from the historical photograph. You may discuss architectural styles, masonry, pillar carvings, rooflines, dome shapes, arches, weathering, era clues, topography, and vegetation.
2. ABSOLUTE REFUSAL OF OFF-TOPIC QUERIES: If the user asks anything unrelated to inspecting this historical monument/photograph—including programming, coding (such as "print hello world in python"), technical computing, math problems, trivia, creative writing, translation, or general chat—you MUST IMMEDIATELY AND POLITELY REFUSE.
   Reply strictly with:
   "I can only assist with investigating the architectural and visual features of this historical photograph. Please ask questions about the structure, stonework, arches, rooflines, or terrain."
3. NEVER WRITE CODE: Do not write, generate, explain, or execute code in any programming language (Python, JavaScript, etc.) under any circumstances. Never output markdown code fences (\`\`\`).
4. NEVER LEAK IDENTIFYING LOCATIONS: NEVER reveal, state, confirm, or hint at the monument name, city, state, district, or geographic coordinates. Help the player deduce the visual patterns themselves.
5. CONCISE FIELD OBSERVATIONS: Keep answers brief, analytical, and within 2-3 sentences.`;

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

  const latestQuestion = messages[messages.length - 1].text.trim().toLowerCase();

  // Guardrail: Intercept obvious coding requests before hitting Groq API
  if (
    /^(print\b|console\.log|def\s+\w+|function\s+\w+|write\s+(a\s+)?(python|javascript|code|script)|how\s+to\s+code)/i.test(
      latestQuestion
    ) ||
    /\b(in\s+python|in\s+javascript|in\s+c\+\+|in\s+java|in\s+rust|write\s+code)\b/i.test(
      latestQuestion
    )
  ) {
    return NextResponse.json({ text: OFF_TOPIC_REFUSAL, source: "guardrail" });
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
            content: SYSTEM_PROMPT,
          },
          ...messages.map((m) => ({ role: m.role, content: m.text })),
        ],
      }),
    });

    if (!response.ok) throw new Error("Groq API error");

    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    let reply = data.choices?.[0]?.message?.content?.trim() || fallback;

    // Safety check: Disallow code fences or programming answers if model slipped
    if (
      /```[\s\S]*```/i.test(reply) ||
      /print\s*\(.*\)/i.test(reply) ||
      /def\s+\w+\(/i.test(reply) ||
      /<script[\s\S]*>/i.test(reply)
    ) {
      reply = OFF_TOPIC_REFUSAL;
    }

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
