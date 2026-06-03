"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (isLast) {
      // Calculate score
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
    <div className="border rounded-lg p-6">
      <div className="mb-4 flex justify-between">
        <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {assessment.questions.length}</span>
        <span className="text-sm font-medium">{question.points} points</span>
      </div>
      <p className="text-lg font-medium">{question.text}</p>
      <RadioGroup value={answers[question.id]} onValueChange={handleAnswer} className="mt-4 space-y-2">
        {question.options.map((opt, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <RadioGroupItem value={opt.text} id={`q${idx}`} />
            <Label htmlFor={`q${idx}`}>{opt.text}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleNext} className="mt-6" disabled={!answers[question.id]}>
        {isLast ? "Submit" : "Next"}
      </Button>
    </div>
  );
}