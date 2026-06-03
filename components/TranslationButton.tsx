"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages = [
  { code: "om", name: "Afaan Oromo" },
  { code: "am", name: "Amharic" },
  { code: "so", name: "Somali" },
  { code: "sw", name: "Swahili" },
  { code: "en", name: "English (original)" }
];

export function TranslationButton({ text }: { text: string }) {
  const [targetLang, setTargetLang] = useState("om");
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (targetLang === "en") {
      setTranslated(text);
      return;
    }
    setLoading(true);
    // Simulate AI translation (will be replaced with real API)
    setTimeout(() => {
      const langName = languages.find(l => l.code === targetLang)?.name;
      setTranslated(`[${langName} translation] ${text}`);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="border rounded-lg p-4 bg-muted/20">
      <h3 className="font-semibold mb-2">🌍 AI Translation</h3>
      <div className="flex flex-wrap gap-2 items-end">
        <div className="flex-1 min-w-[150px]">
          <Select value={targetLang} onValueChange={setTargetLang}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleTranslate} disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </Button>
      </div>
      {translated && (
        <div className="mt-3 p-3 bg-background rounded border">
          <p className="text-sm">{translated}</p>
        </div>
      )}
    </div>
  );
}