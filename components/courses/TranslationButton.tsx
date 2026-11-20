"use client";
import { useState } from "react";

export function TranslationButton({ text }: { text: string }) {
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = () => {
    setLoading(true);
    setTimeout(() => {
      setTranslated(`[Afaan Oromo] ${text}`);
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ margin: "8px 0" }}>
      <button
        onClick={handleTranslate}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#3B4D7A" : "#0EA5E9",
          color: "#151B30",
          border: "none",
          borderRadius: 10,
          padding: "8px 18px",
          fontSize: 13,
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.75 : 1,
          transition: "background-color 0.2s"
        }}
      >
        {loading ? "Translating..." : "🌍 Translate to Afaan Oromo"}
      </button>
      {translated && (
        <div
          style={{
            marginTop: 10,
            padding: "12px 16px",
            backgroundColor: "#F1F4F9",
            border: "1.5px solid #3B4D7A",
            borderRadius: 10,
            color: "#151B30",
            fontSize: 14
          }}
        >
          {translated}
        </div>
      )}
    </div>
  );
}
