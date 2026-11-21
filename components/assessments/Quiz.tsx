"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Assessment } from "@/lib/mock-data/assessments";

interface QuizProps {
  assessment: Assessment;
  onComplete: (score: number, passed: boolean, review: { question: string; chosen: string; correct: string; isCorrect: boolean }[]) => void;
}

export function Quiz({ assessment, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 min timer

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted, answers, currentQuestion]);

  const question = assessment.questions[currentQuestion];
  const isLast = currentQuestion === assessment.questions.length - 1;
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleSubmit = () => {
    let totalPoints = 0;
    let earnedPoints = 0;
    const reviewData: { question: string; chosen: string; correct: string; isCorrect: boolean }[] = [];

    assessment.questions.forEach(q => {
      totalPoints += q.points;
      const userAnswer = answers[q.id] || "No answer selected";
      const correctOption = q.options.find(opt => opt.isCorrect);
      const isCorrect = correctOption ? userAnswer === correctOption.text : false;
      if (isCorrect) {
        earnedPoints += q.points;
      }
      reviewData.push({
        question: q.text,
        chosen: userAnswer,
        correct: correctOption?.text || "",
        isCorrect
      });
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);
    const passed = score >= assessment.passingScore;
    setSubmitted(true);
    onComplete(score, passed, reviewData);
  };

  const handleNext = () => {
    if (isLast) {
      handleSubmit();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (submitted) return null;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? "0" : ""}${remaining}`;
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        border: "1.5px solid #3B4D7A",
        boxShadow: "0 8px 30px rgba(21,27,48,0.06)",
        overflow: "hidden"
      }}
    >
      {/* Top Header with Progress and Timer */}
      <div style={{ backgroundColor: "#151B30", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#0EA5E9", fontWeight: 800, fontSize: 14 }}>
            Question {currentQuestion + 1} of {assessment.questions.length}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#F1F4F9", fontSize: 13, opacity: 0.8 }}>Time Remaining:</span>
          <span
            style={{
              backgroundColor: secondsLeft < 60 ? "#F59E0B" : "rgba(255,255,255,0.12)",
              color: secondsLeft < 60 ? "#151B30" : "#FFFFFF",
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 13,
              fontWeight: 800
            }}
          >
            ⏱ {formatTimer(secondsLeft)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, backgroundColor: "#F1F4F9" }}>
        <div
          style={{
            height: "100%",
            backgroundColor: "#0EA5E9",
            width: `${progress}%`,
            transition: "width 0.4s ease"
          }}
        />
      </div>

      <div style={{ padding: "32px 28px" }}>
        {/* Question Text */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
          <h2 style={{ color: "#151B30", fontSize: 20, fontWeight: 800, margin: 0, lineHeight: 1.4 }}>
            {question.text}
          </h2>
          <span
            style={{
              backgroundColor: "#F1F4F9",
              border: "1px solid #3B4D7A",
              color: "#151B30",
              borderRadius: 999,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            {question.points} pts
          </span>
        </div>

        {/* Options List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {question.options.map((opt, idx) => {
            const isSelected = answers[question.id] === opt.text;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleAnswer(opt.text)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "16px 20px",
                  borderRadius: 14,
                  border: isSelected ? "2px solid #0EA5E9" : "1.5px solid #3B4D7A",
                  backgroundColor: isSelected ? "#F1F4F9" : "#FFFFFF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  transition: "all 0.18s"
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 800,
                    backgroundColor: isSelected ? "#0EA5E9" : "#F1F4F9",
                    color: isSelected ? "#151B30" : "#3B4D7A",
                    border: `1.5px solid ${isSelected ? "#0EA5E9" : "#3B4D7A"}`,
                    flexShrink: 0
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span style={{ color: "#151B30", fontSize: 15, fontWeight: isSelected ? 700 : 500 }}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation Action */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
          <button
            type="button"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            style={{
              backgroundColor: "transparent",
              color: currentQuestion === 0 ? "#3B4D7A" : "#151B30",
              border: "none",
              fontWeight: 700,
              fontSize: 14,
              cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
              opacity: currentQuestion === 0 ? 0.4 : 1
            }}
          >
            ← Previous
          </button>

          <Button
            onClick={handleNext}
            disabled={!answers[question.id]}
            className="rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 border-none shadow-sm px-8 py-3.5 text-sm disabled:opacity-40"
          >
            {isLast ? "Complete & Submit Assessment 🚀" : "Next Question →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
