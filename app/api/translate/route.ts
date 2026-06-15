import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

const languageMap: Record<string, string> = {
  am: "Amharic",
  om: "Afaan Oromo",
  so: "Somali",
  sw: "Swahili",
};

export async function POST(req: Request) {
  const { text, targetLang } = await req.json();
  if (!text || !targetLang) {
    return NextResponse.json({ error: "Missing text or targetLang" }, { status: 400 });
  }

  const targetName = languageMap[targetLang] || targetLang;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a translator. Translate the following text into ${targetName}. Keep the meaning exactly the same. Output only the translation.` },
        { role: "user", content: text }
      ],
      temperature: 0.3,
    });
    const translated = completion.choices[0].message.content;
    return NextResponse.json({ translated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}