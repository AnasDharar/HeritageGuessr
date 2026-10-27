"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useGameStore, type ChatMessage } from "./GameStore";

export default function Investigation() {
  const params = useParams<{ roundId: string }>();
  const router = useRouter();
  const { get, hydrated, addChat, total } = useGameStore();
  const round = get(params.roundId);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (hydrated && !round) router.replace("/");
  }, [hydrated, round, router]);

  if (!hydrated || !round) {
    return (
      <main className="shell">
        <p>Loading expedition…</p>
      </main>
    );
  }

  if (round.submitted) {
    router.replace(`/play/${round.id}/reveal`);
    return null;
  }

  const ask = async (e: FormEvent) => {
    e.preventDefault();
    const question = text.trim();
    if (!question || busy) return;

    const userMessage: ChatMessage = { role: "user", text: question };
    addChat(round.id, userMessage);
    setText("");
    setBusy(true);

    try {
      const messagesPayload = [...(round.chat || []), userMessage];
      const response = await fetch("/api/investigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: round.token, messages: messagesPayload }),
      });
      const data = (await response.json()) as { text?: string };
      addChat(round.id, {
        role: "assistant",
        text: data.text || "The investigation assistant is unavailable. Observe the architectural features carefully.",
      });
    } catch {
      addChat(round.id, {
        role: "assistant",
        text: "The investigation assistant is unavailable. Observe the architectural features carefully.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="investigation">
      <header className="stage-header">
        <div>
          <p className="eyebrow">ROUND INVESTIGATION</p>
          <h1>Study the evidence</h1>
        </div>
        <div className="score">
          {total.toLocaleString()} <small>points</small>
        </div>
      </header>

      <section className="investigation-grid">
        <article className="evidence">
          <img
            src={round.photoUrl}
            alt="Historical photograph to investigate"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="metadata">
            <span>ARCHIVE YEAR · {round.year}</span>
            <span>DIFFICULTY · {round.difficulty}</span>
          </div>
        </article>

        <aside className="chat">
          <div>
            <p className="eyebrow">GROQ INVESTIGATION ASSISTANT</p>
            <h2>Ask about what to look for</h2>
            <p className="muted">
              The assistant helps analyze visible architectural and environmental details without revealing the location.
            </p>
          </div>
          <div className="messages">
            {round.chat.length === 0 && (
              <p className="muted">Try: “What architectural details should I examine?”</p>
            )}
            {round.chat.map((message, index) => (
              <p className={`message ${message.role}`} key={`${message.role}-${index}`}>
                {message.text}
              </p>
            ))}
          </div>
          <form onSubmit={ask}>
            <label htmlFor="question" className="sr-only">
              Ask the investigation assistant
            </label>
            <textarea
              id="question"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              placeholder="Ask an observation question…"
            />
            <button disabled={busy || !text.trim()}>
              {busy ? "Investigating…" : "Ask assistant"}
            </button>
          </form>
        </aside>
      </section>

      <button
        className="primary guess-link"
        onClick={() => router.push(`/play/${round.id}/guess`)}
      >
        Make my guess
      </button>
    </main>
  );
}
