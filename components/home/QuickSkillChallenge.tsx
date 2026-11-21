"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: number;
  topic: "React" | "Python" | "JavaScript";
  question: string;
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
    <div className="master-card rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-black uppercase tracking-wider mb-3">
            <span>⚡ Interactive Assessment Simulator</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5">
            Quick 60-Second Skill Challenge
          </h3>
          <p className="text-sm text-[#F1F4F9]/80 font-medium">
            Test your knowledge, earn bonus XP, and experience our proctored assessment engine.
          </p>
        </div>

        {/* Gamification badge boxes */}
        <div className="flex items-center gap-3">
          <div className="nested-box px-4 py-2 text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-[#F1F4F9]/60">Total XP</span>
            <span className="text-base font-black text-[#F59E0B]">+{score} XP</span>
          </div>
          <div className="nested-box px-4 py-2 text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-[#F1F4F9]/60">Streak</span>
            <span className="text-base font-black text-[#0EA5E9]">🔥 {streak}x</span>
          </div>
        </div>
      </div>

      {/* Topic selector box */}
      <div className="nested-box p-1.5 flex gap-1.5 w-fit mb-6">
        {(["React", "JavaScript", "Python"] as const).map((topic) => (
          <button
            key={topic}
            onClick={() => resetChallenge(topic)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedTopic === topic
                ? "bg-[#0EA5E9] text-[#151B30] shadow-[0_0_15px_rgba(14,165,233,0.35)]"
                : "text-[#F1F4F9]/80 hover:text-white"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Question Container Box */}
      <div className="nested-box p-6 sm:p-8 mb-6">
        <p className="text-base sm:text-lg font-bold text-white mb-6 leading-snug">
          {currentQ.question}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {currentQ.options.map((option, idx) => {
            let btnStyle = "bg-[#151B30] border-[#3B4D7A]/50 text-[#F1F4F9] hover:border-[#0EA5E9] hover:bg-[#192038]";
            if (isAnswered) {
              if (idx === currentQ.correctAnswer) {
                btnStyle = "bg-[#10B981]/20 border-[#10B981] text-[#10B981] font-black shadow-[0_0_15px_rgba(16,185,129,0.25)]";
              } else if (idx === selectedOption) {
                btnStyle = "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.25)]";
              } else {
                btnStyle = "bg-[#151B30]/50 border-[#3B4D7A]/30 text-[#F1F4F9]/40";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3.5 cursor-pointer shadow-sm ${btnStyle}`}
              >
                <span className="w-5 h-5 rounded-full bg-[#192038] border border-[#3B4D7A]/60 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Result Explanation Box */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm font-medium ${
              isCorrect
                ? "bg-[#10B981]/10 border-[#10B981]/40 text-[#10B981]"
                : "bg-[#EF4444]/10 border-[#EF4444]/40 text-[#EF4444]"
            }`}
          >
            <p className="font-bold mb-1">
              {isCorrect ? "🎉 Correct! +50 XP" : "❌ Incorrect, but keep learning!"}
            </p>
            <p className="text-[#F1F4F9]/90">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="text-xs text-[#F1F4F9]/60 font-medium">
          Want full proctored certification? Earn tamper-proof credentials today.
        </span>
        <Link
          href="/assessments"
          className="btn-amber-cta px-6 py-2.5 rounded-xl text-xs font-black text-center shadow-md"
        >
          Take Full Certification Assessment →
        </Link>
      </div>
    </div>
  );
}
