import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 });
  }

  const body = await req.json();
  const { messages } = body;

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
      content: data.choices?.[0]?.message?.content || "No response available",
    });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Failed to fetch from OpenAI" }, { status: 500 });
  }
}
