import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import QuizSetup from "@/components/QuizSetup";
import QuizQuestionView from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import type { QuizQuestion, QuizConfig, QuizPhase } from "@/types/quiz";

const Index = () => {
  const [phase, setPhase] = useState<QuizPhase>("setup");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async (config: QuizConfig) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: config,
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const qs = data.questions as QuizQuestion[];
      if (!qs?.length) throw new Error("No questions generated");

      setQuestions(qs);
      setAnswers(new Array(qs.length).fill(null));
      setCurrentQ(0);
      setPhase("quiz");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to generate quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (answerIndex: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentQ] = answerIndex;
      return copy;
    });
  };

  const handleRestart = () => {
    setPhase("setup");
    setQuestions([]);
    setAnswers([]);
    setCurrentQ(0);
  };

  if (phase === "setup") {
    return <QuizSetup onStart={handleStart} isLoading={isLoading} />;
  }

  if (phase === "quiz") {
    return (
      <QuizQuestionView
        question={questions[currentQ]}
        index={currentQ}
        total={questions.length}
        selectedAnswer={answers[currentQ]}
        onSelect={handleSelect}
        onNext={() => setCurrentQ((p) => Math.min(p + 1, questions.length - 1))}
        onPrev={() => setCurrentQ((p) => Math.max(p - 1, 0))}
        onSubmit={() => setPhase("results")}
        isFirst={currentQ === 0}
        isLast={currentQ === questions.length - 1}
      />
    );
  }

  return (
    <QuizResults
      questions={questions}
      answers={answers}
      onRestart={handleRestart}
    />
  );
};

export default Index;
