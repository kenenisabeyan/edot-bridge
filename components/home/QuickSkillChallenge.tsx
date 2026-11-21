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
    <div
      style={{
        backgroundColor: "#192038",
        border: "1.5px solid #3B4D7A",
        borderRadius: 24,
        padding: "32px 32px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(245,158,11,0.12)",
              border: "1px solid #F59E0B",
              borderRadius: 999,
              padding: "4px 14px",
              marginBottom: 10
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <span style={{ color: "#F59E0B", fontSize: 12, fontWeight: 800 }}>⚡ 60-Second Skill Check</span>
          </div>
          <h3 style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>
            Test Your Knowledge in 60 Seconds
          </h3>
          <p style={{ color: "#F1F4F9", fontSize: 14, margin: 0, opacity: 0.8 }}>
            Pick a language, test your skills, and earn instant XP toward your certification.
          </p>
        </div>

        {/* Gamification stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "#151B30",
            border: "1px solid #3B4D7A",
            padding: "10px 18px",
            borderRadius: 14
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#F1F4F9", opacity: 0.7 }}>Score</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#0EA5E9" }}>+{score} XP</div>
          </div>
          <div style={{ width: 1, height: 24, backgroundColor: "#3B4D7A" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#F1F4F9", opacity: 0.7 }}>Streak</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#F59E0B" }}>🔥 {streak}x</div>
          </div>
        </div>
      </div>

      {/* Topic Switcher */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {(["React", "JavaScript", "Python"] as const).map((t) => (
          <button
            key={t}
            onClick={() => resetChallenge(t)}
            style={{
              padding: "8px 18px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.15s",
              backgroundColor: selectedTopic === t ? "#0EA5E9" : "#151B30",
              color: selectedTopic === t ? "#151B30" : "#F1F4F9",
              border: `1.5px solid ${selectedTopic === t ? "#0EA5E9" : "#3B4D7A"}`
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div
        style={{
          backgroundColor: "#151B30",
          border: "1.5px solid #3B4D7A",
          borderRadius: 18,
          padding: 24,
          marginBottom: 24
        }}
      >
        <h4 style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 800, margin: "0 0 20px" }}>
          {currentQ.question}
        </h4>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {currentQ.options.map((opt, idx) => {
            let bg = "#192038";
            let border = "#3B4D7A";
            let text = "#F1F4F9";

            if (isAnswered) {
              if (idx === currentQ.correctAnswer) {
                bg = "rgba(14,165,233,0.15)";
                border = "#0EA5E9";
                text = "#0EA5E9";
              } else if (idx === selectedOption) {
                bg = "rgba(59,77,122,0.3)";
                border = "#3B4D7A";
                text = "#F1F4F9";
              } else {
                bg = "#151B30";
                border = "rgba(59,77,122,0.3)";
                text = "rgba(241,244,249,0.5)";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 18px",
                  borderRadius: 12,
                  border: `1.5px solid ${border}`,
                  backgroundColor: bg,
                  color: text,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isAnswered ? "default" : "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.15s"
                }}
              >
                <span>{opt}</span>
                {isAnswered && idx === currentQ.correctAnswer && (
                  <span style={{ color: "#0EA5E9", fontWeight: 800, fontSize: 13 }}>✓ Correct (+50 XP)</span>
                )}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                  <span style={{ color: "#F59E0B", fontWeight: 800, fontSize: 13 }}>✕ Incorrect</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation when answered */}
        {isAnswered && (
          <div
            style={{
              marginTop: 18,
              padding: "14px 18px",
              borderRadius: 12,
              backgroundColor: "#192038",
              border: "1px solid #3B4D7A"
            }}
          >
            <div style={{ color: "#0EA5E9", fontWeight: 800, fontSize: 13, marginBottom: 4 }}>
              {isCorrect ? "🎉 Excellent!" : "💡 Explanation:"}
            </div>
            <p style={{ color: "#F1F4F9", fontSize: 13, margin: 0, opacity: 0.9 }}>
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <p style={{ color: "#F1F4F9", fontSize: 13, margin: 0, opacity: 0.8 }}>
          {isAnswered
            ? "Ready for a full verified certificate? Enroll in our structured career paths."
            : "Select the best answer above to test your skills."}
        </p>
        <Link
          href="/courses"
          style={{
            backgroundColor: "#F59E0B",
            color: "#151B30",
            borderRadius: 10,
            padding: "10px 22px",
            fontSize: 13,
            fontWeight: 800,
            textDecoration: "none"
          }}
        >
          Browse Full Courses →
        </Link>
      </div>
    </div>
  );
}
