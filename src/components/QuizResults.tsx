import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Target, TrendingUp } from "lucide-react";
import type { QuizQuestion } from "@/types/quiz";

interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: (number | null)[];
  onRestart: () => void;
}

const QuizResults = ({ questions, answers, onRestart }: QuizResultsProps) => {
  const score = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.correctAnswer ? 1 : 0),
    0
  );
  const percentage = Math.round((score / questions.length) * 100);

  const getFeedback = () => {
    if (percentage >= 90) return { msg: "Outstanding! 🎉", color: "text-success" };
    if (percentage >= 70) return { msg: "Great job! 💪", color: "text-primary" };
    if (percentage >= 50) return { msg: "Good effort! 📚", color: "text-accent" };
    return { msg: "Keep practicing! 🌱", color: "text-destructive" };
  };

  const feedback = getFeedback();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4"
          >
            <Trophy className="w-10 h-10 text-primary" />
          </motion.div>

          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Quiz Complete!
          </h1>
          <p className={`text-xl font-semibold ${feedback.color} mb-4`}>
            {feedback.msg}
          </p>

          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                <Target className="w-4 h-4" /> Score
              </div>
              <span className="text-3xl font-display font-bold text-foreground">
                {score}/{questions.length}
              </span>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                <TrendingUp className="w-4 h-4" /> Accuracy
              </div>
              <span className="text-3xl font-display font-bold text-primary">
                {percentage}%
              </span>
            </div>
          </div>

          <Button onClick={onRestart} className="rounded-xl" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" /> Take Another Quiz
          </Button>
        </motion.div>

        <div className="space-y-4">
          {questions.map((q, i) => {
            const isCorrect = answers[i] === q.correctAnswer;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <h3 className="font-display font-semibold text-foreground">
                    {q.question}
                  </h3>
                </div>

                <div className="ml-9 space-y-2">
                  {q.options.map((opt, j) => {
                    const isUserAnswer = answers[i] === j;
                    const isRightAnswer = q.correctAnswer === j;
                    let style = "bg-background border-border text-muted-foreground";
                    if (isRightAnswer)
                      style = "bg-success/10 border-success text-success";
                    else if (isUserAnswer && !isCorrect)
                      style = "bg-destructive/10 border-destructive text-destructive";

                    return (
                      <div
                        key={j}
                        className={`text-sm px-4 py-2.5 rounded-lg border ${style}`}
                      >
                        {opt}
                        {isRightAnswer && (
                          <span className="ml-2 font-medium">✓ Correct</span>
                        )}
                        {isUserAnswer && !isCorrect && (
                          <span className="ml-2 font-medium">✗ Your answer</span>
                        )}
                      </div>
                    );
                  })}
                  <p className="text-sm text-muted-foreground italic mt-2">
                    {q.explanation}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
