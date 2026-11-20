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
    <div className="rounded-3xl border border-[#3B4D7A]/25 bg-[#F1F4F9] p-6 sm:p-8 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FFFFFF] text-[#151B30] border border-[#3B4D7A]/30 mb-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span>⚡ 60-Second Skill Check</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#151B30] tracking-tight">
            Test Your Knowledge in 60 Seconds
          </h3>
          <p className="text-xs sm:text-sm text-[#3B4D7A] mt-1 font-medium">
            Pick a language, test your skills, and earn instant XP toward your certification.
          </p>
        </div>

        {/* Gamification stats */}
        <div className="flex items-center gap-3 bg-[#FFFFFF] border border-[#3B4D7A]/25 px-4 py-2 rounded-2xl shrink-0 shadow-sm">
          <div className="text-center px-2">
            <div className="text-xs font-semibold text-[#3B4D7A]">Score</div>
            <div className="text-base font-extrabold text-[#0EA5E9]">+{score} XP</div>
          </div>
          <div className="w-px h-6 bg-[#3B4D7A]/30" />
          <div className="text-center px-2">
            <div className="text-xs font-semibold text-[#3B4D7A]">Streak</div>
            <div className="text-base font-extrabold text-[#F59E0B]">🔥 {streak}x</div>
          </div>
        </div>
      </div>

      {/* Topic Switcher */}
      <div className="flex gap-2 mb-6">
        {(["React", "JavaScript", "Python"] as const).map((t) => (
          <button
            key={t}
            onClick={() => resetChallenge(t)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedTopic === t
                ? "bg-[#151B30] text-[#FFFFFF] shadow-sm"
                : "bg-[#FFFFFF] text-[#3B4D7A] border border-[#3B4D7A]/30 hover:text-[#151B30] hover:bg-[#F1F4F9]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-[#FFFFFF] border border-[#3B4D7A]/25 rounded-2xl p-6 mb-6 shadow-sm">
        <h4 className="text-base sm:text-lg font-bold text-[#151B30] mb-5 leading-snug">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let btnStyle = "bg-[#F1F4F9] border-[#3B4D7A]/25 text-[#151B30] hover:border-[#0EA5E9] hover:bg-[#FFFFFF]";
            if (isAnswered) {
              if (idx === currentQ.correctAnswer) {
                btnStyle = "bg-[#0EA5E9]/15 border-2 border-[#0EA5E9] text-[#151B30] font-bold";
              } else if (idx === selectedOption) {
                btnStyle = "bg-[#151B30]/10 border-2 border-[#3B4D7A] text-[#151B30]";
              } else {
                btnStyle = "bg-[#F1F4F9]/60 border-[#3B4D7A]/15 text-[#3B4D7A] opacity-60";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && idx === currentQ.correctAnswer && (
                  <span className="text-[#0EA5E9] font-extrabold ml-2">✓ Correct (+50 XP)</span>
                )}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                  <span className="text-[#3B4D7A] font-bold ml-2">✕ Incorrect</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation when answered */}
        {isAnswered && (
          <div className="mt-5 p-4 rounded-xl bg-[#F1F4F9] border border-[#3B4D7A]/30 text-xs sm:text-sm text-[#151B30]">
            <div className="font-extrabold mb-1 flex items-center gap-1.5 text-[#0EA5E9]">
              <span>{isCorrect ? "🎉 Great job!" : "💡 Explanation:"}</span>
            </div>
            <p className="text-[#3B4D7A] leading-relaxed font-medium">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs font-medium text-[#3B4D7A]">
          {isAnswered
            ? "Ready for a full verified certificate? Enroll in our structured career paths."
            : "Select the best answer above to test your skills."}
        </p>
        <Button asChild className="rounded-xl px-6 py-2.5 font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 transition-opacity shadow-sm shrink-0 border-none">
          <Link href="/courses">Browse Full Courses →</Link>
        </Button>
      </div>
    </div>
  );
}
