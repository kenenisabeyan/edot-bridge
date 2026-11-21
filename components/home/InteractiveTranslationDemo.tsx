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
    label: "አማርኛ",
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
    <div className="luxury-box p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Corner ambient light halo */}
      <div className="absolute -top-24 -right-24 w-52 h-52 rounded-full bg-[#0EA5E9]/15 blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] text-xs font-black uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
            <span>AI Multilingual Engine Showcase</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5">
            Interactive Curriculum Translation Demo
          </h3>
          <p className="text-sm text-[#F1F4F9]/80 font-medium">
            Switch language to see code comments, explanations, and audio narration translate instantly.
          </p>
        </div>

        {/* Language selector tabs */}
        <div className="nested-box flex flex-wrap gap-1.5 p-1.5 shadow-inner">
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
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#0EA5E9] text-[#151B30] shadow-[0_0_15px_rgba(14,165,233,0.35)]"
                    : "text-[#F1F4F9]/75 hover:text-white"
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
        {/* Code Editor Preview Box */}
        <div className="lg:col-span-6 nested-box p-6 font-mono text-xs overflow-x-auto shadow-inner flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3B4D7A]/50">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span className="text-xs font-sans font-bold text-white ml-2">
                  CounterComponent.tsx
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9] text-[10px] font-black">
                React 19
              </span>
            </div>

            <pre className="font-mono-code text-xs sm:text-sm text-[#F1F4F9] leading-relaxed">
              <code>
                <span className="text-[#0EA5E9]">{activeSnippet.codeComment}</span>{"\n"}
                <span className="text-[#F59E0B]">const</span> [count, setCount] = <span className="text-[#F59E0B]">useState</span>(0);{"\n\n"}
                <span className="text-[#3B4D7A]">// Native event handler</span>{"\n"}
                <span className="text-[#0EA5E9]">function</span> <span className="text-white">increment</span>() &#123;{"\n"}
                {"  "}setCount((prev) =&gt; prev + 1);{"\n"}
                &#125;{"\n\n"}
                <span className="text-[#0EA5E9]">return</span> ({"\n"}
                {"  "}&lt;<span className="text-[#0EA5E9]">button</span> onClick=&#123;increment&#125;&gt;{"\n"}
                {"    "}Learned: &#123;count&#125; times{"\n"}
                {"  "}&lt;/<span className="text-[#0EA5E9]">button</span>&gt;{"\n"}
                );
              </code>
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-[#3B4D7A]/40 flex items-center justify-between text-[11px] text-[#F1F4F9]/60">
            <span>Synchronized Language Layer</span>
            <span className="text-[#10B981] font-bold">100% Native Audio Sync</span>
          </div>
        </div>

        {/* Translation Explanation & Audio Narrator Box */}
        <div className="lg:col-span-6 nested-box p-6 flex flex-col justify-between shadow-inner">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#0EA5E9]">
                AI Real-Time Explanation
              </span>
              <span className="text-xs font-bold text-[#F1F4F9]/60">
                Duration: {activeSnippet.audioDuration}
              </span>
            </div>

            <h4 className="text-lg font-extrabold text-white mb-3">
              {activeSnippet.lessonTitle}
            </h4>

            <p className="text-sm text-[#F1F4F9]/90 leading-relaxed font-medium mb-5 bg-[#151B30] p-4 rounded-xl border border-[#3B4D7A]/40 shadow-inner">
              {activeSnippet.explanation}
            </p>

            <div className="p-3.5 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 mb-6">
              <p className="text-xs font-black text-[#0EA5E9] uppercase tracking-wider mb-1">
                💡 Key Concept
              </p>
              <p className="text-xs font-semibold text-white">
                {activeSnippet.keyTakeaway}
              </p>
            </div>
          </div>

          {/* Audio Player Bar */}
          <div className="p-4 rounded-xl bg-[#151B30] border border-[#3B4D7A] flex items-center justify-between gap-4 shadow-inner">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlay}
                className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#151B30] font-black text-sm flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-md shrink-0"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <div>
                <p className="text-xs font-extrabold text-white">
                  {isPlaying ? "Playing AI Voiceover..." : "Listen in Native Voice"}
                </p>
                <p className="text-[10px] text-[#F1F4F9]/60">
                  {activeSnippet.label} • {activeSnippet.audioDuration} min
                </p>
              </div>
            </div>

            {/* Visualizer bars */}
            <div className="flex items-center gap-1">
              {[40, 75, 55, 90, 60, 85, 45, 95].map((h, i) => (
                <span
                  key={i}
                  style={{ height: isPlaying ? `${h}%` : "30%" }}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isPlaying ? "bg-[#0EA5E9]" : "bg-[#3B4D7A]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
