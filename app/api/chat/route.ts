import { NextRequest, NextResponse } from "next/server";
import { NZURI_HEALTHCARE_SYSTEM_PROMPT } from "@/lib/nzuri-healthcare-chatbot-system-prompt";

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 4000;

type ChatRole = "user" | "assistant";

interface IncomingMessage {
  role: string;
  content: unknown;
}

function sanitizeMessages(raw: unknown): { role: ChatRole; content: string }[] {
  if (!Array.isArray(raw)) return [];

  const out: { role: ChatRole; content: string }[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const { role, content } = item as IncomingMessage;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    out.push({
      role,
      content: trimmed.slice(0, MAX_CONTENT_LENGTH),
    });
  }
  return out.slice(-MAX_MESSAGES);
}

export async function POST(req: NextRequest) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 });
  }

  const body = await req.json();
  const sanitized = sanitizeMessages(body?.messages);

  if (sanitized.length === 0) {
    return NextResponse.json(
      { error: "Send at least one user or assistant message." },
      { status: 400 }
    );
  }

  const messages = [
    { role: "system" as const, content: NZURI_HEALTHCARE_SYSTEM_PROMPT },
    ...sanitized,
  ];

  try {
    const openaiRes = await fetch("https://api.chatanywhere.tech/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      console.error("OpenAI Error:", data);
      return NextResponse.json({ error: "OpenAI error", details: data }, { status: openaiRes.status });
    }

    return NextResponse.json({
      content: data.choices?.[0]?.message?.content ?? "No response available",
    });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Failed to fetch from OpenAI" }, { status: 500 });
  }
}
