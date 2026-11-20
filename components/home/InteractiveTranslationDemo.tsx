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
    <div className="rounded-3xl border border-[#1C202C] bg-[#161B26] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 bg-gradient-to-br from-[#566AF6] to-[#3896E8] blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#566AF6]/15 text-[#7B8BFF] border border-[#566AF6]/25 mb-2">
            <span>✨ AI Multilingual Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Interactive Lesson Translation Demo
          </h3>
          <p className="text-xs sm:text-sm text-[#8C95A6] mt-1">
            Switch language to see code comments, explanations, and audio narration translate live.
          </p>
        </div>

        {/* Language selector tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#0D1016] border border-[#2C344A]">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#566AF6] text-white shadow-sm"
                    : "text-[#8C95A6] hover:text-white hover:bg-[#1C202C]"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Editor Preview */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0D1016] border border-[#1C202C] p-5 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1C202C]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-[#8C95A6] ml-2">CounterComponent.tsx</span>
            </div>
            <span className="text-[11px] text-[#566AF6] font-semibold bg-[#566AF6]/10 px-2 py-0.5 rounded">
              React 19
            </span>
          </div>

          <pre className="text-slate-300 leading-relaxed">
            <code>
              <span className="text-[#8C95A6] italic">{activeSnippet.codeComment}</span>
              {"\n"}
              <span className="text-[#566AF6]">const</span> [count, setCount] ={" "}
              <span className="text-[#3896E8]">useState</span>(0);
              {"\n\n"}
              <span className="text-[#8C95A6] italic">// Handle click event</span>
              {"\n"}
              <span className="text-[#566AF6]">function</span>{" "}
              <span className="text-emerald-400">increment</span>() &#123;
              {"\n"}  setCount((prev) =&gt; prev + 1);
              {"\n"}&#125;
              {"\n\n"}
              <span className="text-[#566AF6]">return</span> (
              {"\n"}  &lt;<span className="text-[#3896E8]">button</span> onClick=&#123;increment&#125;&gt;
              {"\n"}    Learned: &#123;count&#125; times
              {"\n"}  &lt;/<span className="text-[#3896E8]">button</span>&gt;
              {"\n"});
            </code>
          </pre>
        </div>

        {/* Translation Explanation & Audio Narrator */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#111520] border border-[#1C202C] rounded-2xl p-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#8C95A6] uppercase tracking-wider">
                Translated Lesson
              </span>
              <span className="text-xs text-[#3896E8] font-bold">100% Accurate</span>
            </div>

            <h4 className="text-lg font-bold text-white mb-2 leading-snug">
              {activeSnippet.lessonTitle}
            </h4>

            <p className="text-sm text-[#8C95A6] leading-relaxed mb-4">
              {activeSnippet.explanation}
            </p>

            <div className="p-3 rounded-xl bg-[#0D1016] border border-[#2C344A] text-xs text-slate-200">
              <span className="text-[#566AF6] font-bold mr-1">💡 Key Takeaway:</span>
              {activeSnippet.keyTakeaway}
            </div>
          </div>

          {/* Interactive Voice Audio Player */}
          <div className="mt-6 pt-4 border-t border-[#1C202C]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎙️</span>
                <span className="text-xs font-semibold text-white">AI Voiceover ({activeSnippet.label})</span>
              </div>
              <span className="text-xs text-[#8C95A6] font-mono">{activeSnippet.audioDuration}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePlay}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors shadow-sm shrink-0 cursor-pointer"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>

              <div className="flex-1 flex items-center gap-1 h-7 px-3 rounded-xl bg-[#0D1016] border border-[#2C344A]">
                {[40, 75, 55, 90, 30, 80, 60, 100, 45, 85, 50, 70, 95, 35, 65].map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      isPlaying
                        ? "bg-[#566AF6] animate-pulse"
                        : "bg-[#2C344A]"
                    }`}
                    style={{ height: isPlaying ? `${Math.max(20, (h * (i % 2 === 0 ? 1 : 0.7)))}%` : "30%" }}
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
