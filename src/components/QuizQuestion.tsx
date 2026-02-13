import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import type { QuizQuestion as QType } from "@/types/quiz";

interface QuizQuestionProps {
  question: QType;
  index: number;
  total: number;
  selectedAnswer: number | null;
  onSelect: (answerIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const optionLetters = ["A", "B", "C", "D"];

const QuizQuestionView = ({
  question,
  index,
  total,
  selectedAnswer,
  onSelect,
  onNext,
  onPrev,
  onSubmit,
  isFirst,
  isLast,
}: QuizQuestionProps) => {
  const progress = ((index + 1) / total) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {index + 1} of {total}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-8 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelect(i)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                  selectedAnswer === i
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 bg-background"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                    selectedAnswer === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {optionLetters[i]}
                </span>
                <span className="text-base text-foreground">{option}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={isFirst}
            className="rounded-xl"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          {isLast ? (
            <Button
              onClick={onSubmit}
              disabled={selectedAnswer === null}
              className="rounded-xl"
            >
              <Send className="w-4 h-4 mr-2" /> Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={selectedAnswer === null}
              className="rounded-xl"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizQuestionView;
