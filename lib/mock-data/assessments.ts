export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false";
  options: { text: string; isCorrect: boolean }[];
  points: number;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  passingScore: number;
  questions: Question[];
}

export const mockAssessments: Assessment[] = [
  {
    id: "assess-1",
    title: "React Fundamentals Assessment",
    description: "Test your knowledge of React components, state, and hooks.",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        text: "What is React?",
        type: "multiple-choice",
        options: [
          { text: "A backend framework", isCorrect: false },
          { text: "A JavaScript library for building UIs", isCorrect: true },
          { text: "A database", isCorrect: false },
          { text: "A CSS preprocessor", isCorrect: false }
        ],
        points: 10
      },
      {
        id: "q2",
        text: "Which hook is used for side effects?",
        type: "multiple-choice",
        options: [
          { text: "useState", isCorrect: false },
          { text: "useEffect", isCorrect: true },
          { text: "useContext", isCorrect: false },
          { text: "useReducer", isCorrect: false }
        ],
        points: 10
      },
      {
        id: "q3",
        text: "Props are immutable.",
        type: "true-false",
        options: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false }
        ],
        points: 10
      }
    ]
  }
];