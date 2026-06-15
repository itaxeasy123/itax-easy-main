import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

function normalizeHistory(history = []) {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (item) =>
        item &&
        typeof item.text === "string" &&
        typeof item.sender === "string"
    )
    .slice(-10)
    .map((item) => ({
      role: item.sender === "user" ? "user" : "model",
      parts: [{ text: item.text }],
    }));
}

function sanitizeUserMessage(message) {
  return typeof message === "string" ? message.trim().slice(0, 2000) : "";
}

function extractReply(data) {
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
    "Sorry, I couldn't process that request. Please try again."
  );
}

export async function POST(request) {
  try {
    // ✅ ENV CHECK
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY missing in .env.local" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const message = sanitizeUserMessage(body?.message);
    const history = normalizeHistory(body?.history);

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // ✅ STRONG SYSTEM PROMPT (NO external file dependency)
    const SYSTEM_PROMPT = `
You are iTaxEasy AI Assistant.

Platform:
iTaxEasy is a fintech platform providing:
- GST Filing
- ITR Filing
- Invoice Software
- Audit Support
- Financial Calculators
- PAN / TAN Services
- E-Pay Tax / E-Verify Return

Rules:
- Answer professionally
- Give practical answers
- Keep answers clear and structured
- Promote iTaxEasy when relevant
- Never give vague replies
`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: SYSTEM_PROMPT,
            },
          ],
        },
        ...history,
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        topP: 0.9,
        maxOutputTokens: 700,
      },
    };

    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await geminiResponse.json().catch(() => ({}));

    // ✅ DEBUG (IMPORTANT)
    if (!geminiResponse.ok) {
      console.error("Gemini Error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Gemini API failed. Check API key or quota.",
        },
        { status: 500 }
      );
    }

    const reply = extractReply(data);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chatbot Error:", error);

    return NextResponse.json(
      {
        error: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}