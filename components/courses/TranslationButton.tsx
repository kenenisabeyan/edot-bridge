"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TranslationButton({ text }: { text: string }) {
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = () => {
    setLoading(true);
    // Simulate AI translation (later replace with real API)
    setTimeout(() => {
      setTranslated(`[Afaan Oromo] ${text}`);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="my-2">
      <Button onClick={handleTranslate} disabled={loading}>
        {loading ? "Translating..." : "Translate to Afaan Oromo"}
      </Button>
      {translated && <p className="mt-2 p-2 bg-muted rounded">{translated}</p>}
    </div>
  );
}
