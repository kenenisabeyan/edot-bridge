"use client";

import { useState } from "react";

type LanguageKey = "en" | "om" | "am" | "sw";

interface TranslationSnippet {
  label: string;
  flag: string;
  lessonTitle: string;
  audioDuration: string;
  codeComment: string;
  explanation: string;
  keyTakeaway: string;
}

const snippets: Record<LanguageKey, TranslationSnippet> = {
  en: {
    label: "English",
    flag: "🇬🇧",
    lessonTitle: "React State & Hooks Architecture",
    audioDuration: "0:42",
    codeComment: "// Store dynamic state with real-time updates",
    explanation:
      "When state changes in React, the component automatically re-renders with the latest values. Hooks let you tap into React features without writing class components.",
    keyTakeaway: "State holds reactive values that drive UI updates directly.",
  },
  om: {
    label: "Afaan Oromoo",
    flag: "🇪🇹",
    lessonTitle: "Haala (State) fi Hooks React",
    audioDuration: "0:48",
    codeComment: "// Jijjiirama haalaa yeroodhaa gara yerootti galmeessi",
    explanation:
      "Yeroo haalli (state) React keessatti jijjiiramu, kompoonantichi ofumaan haaromfama. Hooks fayyadamuun koodii gabaabaa fi ifa ta'een hojjechuuf gargaara.",
    keyTakeaway: "Haalli (state) odeeffannoo yeroo yeroon jijjiiramu qabata.",
  },
  am: {
    label: "አማርኛ (Amharic)",
    flag: "🇪🇹",
    lessonTitle: "የReact ስቴት (State) እና ሁክስ ግንዛቤ",
    audioDuration: "0:50",
    codeComment: "// ተለዋዋጭ ውሂብን በቅጽበት መከታተያ",
    explanation:
      "በReact ውስጥ ስቴት ሲቀየር ኮምፖነንቱ በራሱ አዲስ መረጃዎችን አሳይቶ ራሱን ያድሳል። ሁክስ (Hooks) በቀላሉ ዘመናዊ መተግበሪያዎችን እንድንገነባ ያግዛሉ።",
    keyTakeaway: "ስቴት የመተግበሪያውን ተለዋዋጭ መረጃ በቅጽበት ይቆጣጠራል።",
  },
  sw: {
    label: "Kiswahili",
    flag: "🇰🇪",
    lessonTitle: "Mfumo wa State na Hooks za React",
    audioDuration: "0:45",
    codeComment: "// Hifadhi hali inayobadilika mara moja",
    explanation:
      "Hali (state) inapobadilika katika React, kipengele kinajisasisha kiotomatiki na data mpya zaidi. Hooks hurahisisha ujenzi wa programu za kisasa.",
    keyTakeaway: "State hushikilia data inayobadilika na kuboresha mwonekano wa tovuti.",
  },
};

export function InteractiveTranslationDemo() {
  const [selectedLang, setSelectedLang] = useState<LanguageKey>("om");
  const [isPlaying, setIsPlaying] = useState(false);

  const activeSnippet = snippets[selectedLang];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        backgroundColor: "#192038",
        border: "1.5px solid #3B4D7A",
        borderRadius: 24,
        padding: "32px 32px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
      }}
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(14,165,233,0.12)",
              border: "1px solid #0EA5E9",
              borderRadius: 999,
              padding: "4px 14px",
              marginBottom: 10
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#0EA5E9" }} />
            <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800 }}>AI Multilingual Engine</span>
          </div>
          <h3 style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>
            Interactive Lesson Translation Demo
          </h3>
          <p style={{ color: "#F1F4F9", fontSize: 14, margin: 0, opacity: 0.8 }}>
            Switch language to see code comments, explanations, and audio narration translate live.
          </p>
        </div>

        {/* Language selector tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, backgroundColor: "#151B30", border: "1px solid #3B4D7A", borderRadius: 12, padding: 4 }}>
          {(Object.keys(snippets) as LanguageKey[]).map((key) => {
            const item = snippets[key];
            const isActive = selectedLang === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedLang(key);
                  setIsPlaying(false);
                }}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: isActive ? "#0EA5E9" : "transparent",
                  color: isActive ? "#151B30" : "#F1F4F9",
                  transition: "all 0.15s"
                }}
              >
                <span>{item.flag} {item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code & Audio Player Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
        {/* Code Editor Preview */}
        <div
          style={{
            backgroundColor: "#151B30",
            border: "1.5px solid #3B4D7A",
            borderRadius: 18,
            padding: 20,
            fontFamily: "monospace",
            fontSize: 13,
            overflowX: "auto"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(59,77,122,0.4)", paddingBottom: 10, marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#3B4D7A" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#3B4D7A" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#3B4D7A" }} />
              <span style={{ color: "#F1F4F9", fontSize: 12, marginLeft: 8, fontFamily: "sans-serif" }}>CounterComponent.tsx</span>
            </div>
            <span style={{ backgroundColor: "#0EA5E9", color: "#151B30", padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 800 }}>
              React 19
            </span>
          </div>

          <pre style={{ color: "#F1F4F9", lineHeight: 1.7, margin: 0 }}>
            <code>
              <span style={{ color: "#3B4D7A", fontStyle: "italic" }}>{activeSnippet.codeComment}</span>
              {"\n"}
              <span style={{ color: "#0EA5E9", fontWeight: 800 }}>const</span> [count, setCount] ={" "}
              <span style={{ color: "#F59E0B" }}>useState</span>(0);
              {"\n\n"}
              <span style={{ color: "#3B4D7A", fontStyle: "italic" }}>// Handle click event</span>
              {"\n"}
              <span style={{ color: "#0EA5E9", fontWeight: 800 }}>function</span>{" "}
              <span style={{ color: "#FFFFFF" }}>increment</span>() &#123;
              {"\n"}  setCount((prev) =&gt; prev + 1);
              {"\n"}&#125;
              {"\n\n"}
              <span style={{ color: "#0EA5E9", fontWeight: 800 }}>return</span> (
              {"\n"}  &lt;<span style={{ color: "#0EA5E9" }}>button</span> onClick=&#123;increment&#125;&gt;
              {"\n"}    Learned: &#123;count&#125; times
              {"\n"}  &lt;/<span style={{ color: "#0EA5E9" }}>button</span>&gt;
              {"\n"});
            </code>
          </pre>
        </div>

        {/* Translation Explanation & Audio Narrator */}
        <div
          style={{
            backgroundColor: "#151B30",
            border: "1.5px solid #3B4D7A",
            borderRadius: 18,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ color: "#F1F4F9", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.7 }}>
                Translated Lesson
              </span>
              <span style={{ backgroundColor: "rgba(14,165,233,0.15)", color: "#0EA5E9", border: "1px solid #0EA5E9", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>
                100% Accurate
              </span>
            </div>

            <h4 style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 800, margin: "0 0 10px" }}>
              {activeSnippet.lessonTitle}
            </h4>

            <p style={{ color: "#F1F4F9", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px", opacity: 0.85 }}>
              {activeSnippet.explanation}
            </p>

            <div style={{ backgroundColor: "#192038", border: "1px solid #3B4D7A", borderRadius: 12, padding: "12px 14px" }}>
              <span style={{ color: "#0EA5E9", fontWeight: 800, marginRight: 6 }}>💡 Key Takeaway:</span>
              <span style={{ color: "#F1F4F9", fontSize: 13 }}>{activeSnippet.keyTakeaway}</span>
            </div>
          </div>

          {/* Interactive Voice Audio Player */}
          <div style={{ marginTop: 24, borderTop: "1px solid rgba(59,77,122,0.4)", paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ color: "#F1F4F9", fontSize: 12, fontWeight: 700 }}>
                🎙️ AI Voiceover ({activeSnippet.label})
              </span>
              <span style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 800, fontFamily: "monospace" }}>
                {activeSnippet.audioDuration}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                onClick={handlePlay}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                  color: "#151B30",
                  border: "none",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, height: 32, padding: "0 12px", backgroundColor: "#192038", borderRadius: 10, border: "1px solid #3B4D7A" }}>
                {[40, 75, 55, 90, 30, 80, 60, 100, 45, 85, 50, 70, 95, 35, 65].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      flex: 1,
                      borderRadius: 999,
                      backgroundColor: isPlaying ? "#0EA5E9" : "#3B4D7A",
                      height: isPlaying ? `${Math.max(25, (h * (i % 2 === 0 ? 1 : 0.7)))}%` : "30%",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
