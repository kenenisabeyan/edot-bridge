"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Assessment } from "@/lib/mock-data/assessments";

interface QuizProps {
  assessment: Assessment;
  onComplete: (score: number, passed: boolean) => void;
}

export function Quiz({ assessment, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const question = assessment.questions[currentQuestion];
  const isLast = currentQuestion === assessment.questions.length - 1;
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (isLast) {
      let totalPoints = 0;
      let earnedPoints = 0;
      assessment.questions.forEach(q => {
        totalPoints += q.points;
        const userAnswer = answers[q.id];
        const correctOption = q.options.find(opt => opt.isCorrect);
        if (correctOption && userAnswer === correctOption.text) {
          earnedPoints += q.points;
        }
      });
      const score = Math.round((earnedPoints / totalPoints) * 100);
      const passed = score >= assessment.passingScore;
      setSubmitted(true);
      onComplete(score, passed);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (submitted) return null;

  return (
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#3B4D7A]/20 shadow-sm overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-[#F1F4F9]">
        <div
          className="h-full bg-[#0EA5E9] transition-all duration-500 rounded-r-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-bold text-[#3B4D7A]">
            Question {currentQuestion + 1} of {assessment.questions.length}
          </span>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-[#F59E0B] text-[#151B30]">
            {question.points} points
          </span>
        </div>

        {/* Question */}
        <p className="text-lg font-extrabold text-[#151B30] leading-snug mb-6">{question.text}</p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const selected = answers[question.id] === opt.text;
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.text)}
                className="w-full text-left p-4 rounded-xl border-2 font-semibold text-sm transition-all cursor-pointer"
                style={{
                  borderColor: selected ? "#0EA5E9" : "rgba(59,77,122,0.25)",
                  background: selected ? "rgba(14,165,233,0.08)" : "#F1F4F9",
                  color: selected ? "#151B30" : "#3B4D7A",
                }}
              >
                <span
                  className="inline-flex w-6 h-6 rounded-full border-2 items-center justify-center text-xs font-black mr-3 shrink-0"
                  style={{
                    borderColor: selected ? "#0EA5E9" : "rgba(59,77,122,0.4)",
                    background: selected ? "#0EA5E9" : "transparent",
                    color: selected ? "#151B30" : "#3B4D7A",
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt.text}
              </button>
            );
          })}
        </div>

        {/* Next / Submit */}
        <Button
          onClick={handleNext}
          disabled={!answers[question.id]}
          className="mt-6 w-full rounded-xl font-bold bg-[#F59E0B] text-[#151B30] hover:opacity-90 border-none shadow-sm py-3 disabled:opacity-50"
        >
          {isLast ? "Submit Assessment →" : "Next Question →"}
        </Button>
      </div>
    </div>
  );
}
