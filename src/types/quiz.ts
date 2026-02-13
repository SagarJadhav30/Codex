export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizConfig {
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  numQuestions: number;
}

export type QuizPhase = "setup" | "quiz" | "results";
