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
    <div className="rounded-3xl border border-[#3B4D7A]/25 bg-[#F1F4F9] p-6 sm:p-8 shadow-lg relative overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 bg-[#0EA5E9] blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FFFFFF] text-[#151B30] border border-[#3B4D7A]/30 mb-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
            <span>AI Multilingual Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#151B30] tracking-tight">
            Interactive Lesson Translation Demo
          </h3>
          <p className="text-xs sm:text-sm text-[#3B4D7A] mt-1 font-medium">
            Switch language to see code comments, explanations, and audio narration translate live.
          </p>
        </div>

        {/* Language selector tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#FFFFFF] border border-[#3B4D7A]/25 shadow-sm">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#0EA5E9] text-[#151B30] shadow-sm"
                    : "text-[#3B4D7A] hover:text-[#151B30] hover:bg-[#F1F4F9]"
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code & Audio Player Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Code Editor Preview */}
        <div className="lg:col-span-7 rounded-2xl bg-[#151B30] border border-[#3B4D7A]/40 p-5 font-mono text-xs sm:text-sm overflow-x-auto shadow-md">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3B4D7A]/40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3B4D7A] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#3B4D7A] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#3B4D7A] inline-block" />
              <span className="text-xs text-[#F1F4F9] ml-2 font-sans font-medium">CounterComponent.tsx</span>
            </div>
            <span className="text-[11px] text-[#151B30] font-bold bg-[#0EA5E9] px-2.5 py-0.5 rounded-full">
              React 19
            </span>
          </div>

          <pre className="text-[#F1F4F9] leading-relaxed">
            <code>
              <span className="text-[#3B4D7A] italic">{activeSnippet.codeComment}</span>
              {"\n"}
              <span className="text-[#0EA5E9] font-bold">const</span> [count, setCount] ={" "}
              <span className="text-[#F59E0B]">useState</span>(0);
              {"\n\n"}
              <span className="text-[#3B4D7A] italic">// Handle click event</span>
              {"\n"}
              <span className="text-[#0EA5E9] font-bold">function</span>{" "}
              <span className="text-[#FFFFFF]">increment</span>() &#123;
              {"\n"}  setCount((prev) =&gt; prev + 1);
              {"\n"}&#125;
              {"\n\n"}
              <span className="text-[#0EA5E9] font-bold">return</span> (
              {"\n"}  &lt;<span className="text-[#0EA5E9]">button</span> onClick=&#123;increment&#125;&gt;
              {"\n"}    Learned: &#123;count&#125; times
              {"\n"}  &lt;/<span className="text-[#0EA5E9]">button</span>&gt;
              {"\n"});
            </code>
          </pre>
        </div>

        {/* Translation Explanation & Audio Narrator */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#FFFFFF] border border-[#3B4D7A]/25 rounded-2xl p-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#3B4D7A] uppercase tracking-wider">
                Translated Lesson
              </span>
              <span className="text-xs text-[#0EA5E9] font-bold bg-[#F1F4F9] px-2 py-0.5 rounded-full">
                100% Accurate
              </span>
            </div>

            <h4 className="text-lg font-extrabold text-[#151B30] mb-2 leading-snug">
              {activeSnippet.lessonTitle}
            </h4>

            <p className="text-sm text-[#3B4D7A] leading-relaxed mb-4">
              {activeSnippet.explanation}
            </p>

            <div className="p-3.5 rounded-xl bg-[#F1F4F9] border border-[#3B4D7A]/20 text-xs text-[#151B30]">
              <span className="text-[#0EA5E9] font-bold mr-1">💡 Key Takeaway:</span>
              <span className="font-medium text-[#151B30]">{activeSnippet.keyTakeaway}</span>
            </div>
          </div>

          {/* Interactive Voice Audio Player */}
          <div className="mt-6 pt-4 border-t border-[#3B4D7A]/20">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎙️</span>
                <span className="text-xs font-bold text-[#151B30]">AI Voiceover ({activeSnippet.label})</span>
              </div>
              <span className="text-xs text-[#3B4D7A] font-bold font-mono">{activeSnippet.audioDuration}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePlay}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F59E0B] text-[#151B30] font-bold text-sm hover:opacity-90 transition-opacity shadow-sm shrink-0 cursor-pointer"
                aria-label={isPlaying ? "Pause voiceover" : "Play voiceover"}
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              <div className="flex-1 flex items-center gap-1 h-8 px-3 rounded-xl bg-[#F1F4F9] border border-[#3B4D7A]/20">
                {[40, 75, 55, 90, 30, 80, 60, 100, 45, 85, 50, 70, 95, 35, 65].map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      isPlaying
                        ? "bg-[#0EA5E9] animate-pulse"
                        : "bg-[#3B4D7A]/30"
                    }`}
                    style={{ height: isPlaying ? `${Math.max(25, (h * (i % 2 === 0 ? 1 : 0.7)))}%` : "30%" }}
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
