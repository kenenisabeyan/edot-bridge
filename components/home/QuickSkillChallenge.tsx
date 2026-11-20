"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  topic: "React" | "Python" | "JavaScript";
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const challengeQuestions: Question[] = [
  {
    id: 1,
    topic: "React",
    question: "What happens when you pass an empty dependency array `[]` to `useEffect` in React?",
    options: [
      "The effect runs on every single re-render",
      "The effect runs only once when the component mounts",
      "The effect never runs",
      "The component throws a runtime compilation error",
    ],
    correctAnswer: 1,
    explanation: "An empty array `[]` tells React your effect doesn't depend on any values, so it executes only on the initial mount.",
  },
  {
    id: 2,
    topic: "JavaScript",
    question: "What is the output of `typeof null` in JavaScript?",
    options: [
      "'null'",
      "'undefined'",
      "'object'",
      "'boolean'",
    ],
    correctAnswer: 2,
    explanation: "In JavaScript, `typeof null === 'object'` due to a historical legacy bug from the very first JS implementation.",
  },
  {
    id: 3,
    topic: "Python",
    question: "Which of the following creates an immutable sequence of elements in Python?",
    options: [
      "List `[1, 2, 3]`",
      "Tuple `(1, 2, 3)`",
      "Dictionary `{'a': 1}`",
      "Set `{1, 2, 3}`",
    ],
    correctAnswer: 1,
    explanation: "Tuples in Python are immutable, meaning once created their contents cannot be modified or resized.",
  },
];

export function QuickSkillChallenge() {
  const [selectedTopic, setSelectedTopic] = useState<"React" | "JavaScript" | "Python">("React");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(1);

  const currentQ = challengeQuestions.find((q) => q.topic === selectedTopic) || challengeQuestions[0];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctAnswer) {
      setScore((prev) => prev + 50);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(1);
    }
  };

  const resetChallenge = (topic: "React" | "JavaScript" | "Python") => {
    setSelectedTopic(topic);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="rounded-3xl border border-[#1C202C] bg-[#161B26] p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/25 mb-2">
            <span>⚡ 60-Second Skill Check</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Test Your Knowledge in 60 Seconds
          </h3>
          <p className="text-xs sm:text-sm text-[#8C95A6] mt-1">
            Pick a language, test your skills, and earn instant XP toward your certification.
          </p>
        </div>

        {/* Gamification stats */}
        <div className="flex items-center gap-3 bg-[#0D1016] border border-[#2C344A] px-4 py-2 rounded-2xl shrink-0">
          <div className="text-center px-2">
            <div className="text-xs text-[#8C95A6]">Score</div>
            <div className="text-base font-bold text-[#566AF6]">+{score} XP</div>
          </div>
          <div className="w-px h-6 bg-[#1C202C]" />
          <div className="text-center px-2">
            <div className="text-xs text-[#8C95A6]">Streak</div>
            <div className="text-base font-bold text-amber-400">🔥 {streak}x</div>
          </div>
        </div>
      </div>

      {/* Topic Switcher */}
      <div className="flex gap-2 mb-6">
        {(["React", "JavaScript", "Python"] as const).map((t) => (
          <button
            key={t}
            onClick={() => resetChallenge(t)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedTopic === t
                ? "bg-white text-black shadow-sm"
                : "bg-[#0D1016] text-[#8C95A6] border border-[#2C344A] hover:text-white hover:bg-[#1C202C]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-[#0D1016] border border-[#1C202C] rounded-2xl p-6 mb-6">
        <h4 className="text-base sm:text-lg font-semibold text-white mb-5 leading-snug">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let btnStyle = "bg-[#161B26] border-[#2C344A] text-slate-200 hover:border-[#566AF6] hover:bg-[#1B2230]";
            if (isAnswered) {
              if (idx === currentQ.correctAnswer) {
                btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold";
              } else if (idx === selectedOption) {
                btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
              } else {
                btnStyle = "bg-[#161B26]/50 border-[#1C202C] text-[#8C95A6] opacity-60";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && idx === currentQ.correctAnswer && (
                  <span className="text-emerald-400 font-bold ml-2">✓ Correct (+50 XP)</span>
                )}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                  <span className="text-rose-400 font-bold ml-2">✕ Incorrect</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation when answered */}
        {isAnswered && (
          <div className="mt-5 p-4 rounded-xl bg-[#161B26] border border-[#2C344A] text-xs sm:text-sm text-slate-200 animate-fadeIn">
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <span>{isCorrect ? "🎉 Great job!" : "💡 Explanation:"}</span>
            </div>
            <p className="text-[#8C95A6] leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-[#8C95A6]">
          {isAnswered
            ? "Ready for a full verified certificate? Enroll in our structured career paths."
            : "Select the best answer above to test your skills."}
        </p>
        <Button asChild className="rounded-xl px-6 py-2.5 font-semibold bg-white text-neutral-950 hover:bg-neutral-200 transition-colors shadow-sm shrink-0">
          <Link href="/courses">Browse Full Courses →</Link>
        </Button>
      </div>
    </div>
  );
}
