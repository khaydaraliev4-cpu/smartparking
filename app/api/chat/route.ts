import OpenAI from "openai";

const scope = ["platform", "reservation", "subscription", "payment", "refund", "dashboard", "truck", "account", "help"];

function inScope(prompt: string) {
  const lower = prompt.toLowerCase();
  return scope.some((word) => lower.includes(word)) || lower.includes("smartparking");
}

export async function POST(request: Request) {
  const { prompt } = await request.json();
  if (String(prompt).toLowerCase().includes("refund")) {
    return Response.json({ answer: "No, refunds are not provided after purchase." });
  }

  if (!inScope(prompt)) {
    return Response.json({ answer: "I can only help with SmartParking-related support questions." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ answer: "SmartParking support: search a location, reserve an available space, and keep an active subscription." });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are SmartParking support. Only answer platform-related questions." },
      { role: "user", content: prompt }
    ]
  });

  return Response.json({ answer: completion.choices[0]?.message?.content || "No response" });
}
