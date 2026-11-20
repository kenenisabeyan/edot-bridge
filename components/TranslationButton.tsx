"use client";
import { useState } from "react";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedLang = languages.find(l => l.code === targetLang);

  const handleTranslate = async () => {
    if (targetLang === "en") {
      setTranslated(text);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const langName = languages.find(l => l.code === targetLang)?.name;
      setTranslated(`[${langName} translation] ${text}`);
      setLoading(false);
    }, 800);
  };

  return (
    <div
      style={{
        border: "1.5px solid #3B4D7A",
        borderRadius: 14,
        padding: "18px 20px",
        backgroundColor: "#F1F4F9"
      }}
    >
      <h3 style={{ color: "#151B30", fontWeight: 700, fontSize: 15, margin: "0 0 14px" }}>
        🌍 AI Translation
      </h3>

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        {/* Custom language selector */}
        <div style={{ position: "relative", minWidth: 180, flex: 1 }}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: "100%", padding: "9px 14px",
              backgroundColor: "#FFFFFF", border: `1.5px solid ${dropdownOpen ? "#0EA5E9" : "#3B4D7A"}`,
              borderRadius: 10, color: "#151B30", fontSize: 14,
              cursor: "pointer", textAlign: "left", display: "flex",
              alignItems: "center", justifyContent: "space-between"
            }}
          >
            {selectedLang?.name}
            <span style={{ fontSize: 11, color: "#3B4D7A", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
                backgroundColor: "#FFFFFF", border: "1.5px solid #3B4D7A",
                borderRadius: 10, zIndex: 50, overflow: "hidden",
                boxShadow: "0 4px 16px rgba(21,27,48,0.12)"
              }}
            >
              {languages.map(lang => (
                <div
                  key={lang.code}
                  onClick={() => { setTargetLang(lang.code); setDropdownOpen(false); }}
                  style={{
                    padding: "10px 14px", cursor: "pointer",
                    backgroundColor: lang.code === targetLang ? "#F1F4F9" : "#FFFFFF",
                    color: "#151B30", fontSize: 14,
                    fontWeight: lang.code === targetLang ? 700 : 400
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "#F1F4F9"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = lang.code === targetLang ? "#F1F4F9" : "#FFFFFF"; }}
                >
                  {lang.code === targetLang && <span style={{ color: "#0EA5E9", marginRight: 8 }}>✓</span>}
                  {lang.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleTranslate}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#3B4D7A" : "#0EA5E9",
            color: "#151B30",
            border: "none", borderRadius: 10,
            padding: "10px 20px", fontWeight: 700,
            fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.75 : 1,
            transition: "background-color 0.2s",
            flexShrink: 0
          }}
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </div>

      {translated && (
        <div
          style={{
            marginTop: 14, padding: "14px 16px",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #3B4D7A",
            borderRadius: 10
          }}
        >
          <p style={{ color: "#151B30", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            {translated}
          </p>
        </div>
      )}
    </div>
  );
}
