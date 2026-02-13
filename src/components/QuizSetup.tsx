import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QuizConfig } from "@/types/quiz";

interface QuizSetupProps {
  onStart: (config: QuizConfig) => void;
  isLoading: boolean;
}

const QuizSetup = ({ onStart, isLoading }: QuizSetupProps) => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [numQuestions, setNumQuestions] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onStart({ topic: topic.trim(), difficulty, numQuestions });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
          >
            <Brain className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-foreground">
            AI Quiz Generator
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Test your knowledge on any topic with AI-generated questions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-sm font-medium text-foreground">
              Quiz Topic
            </Label>
            <Input
              id="topic"
              placeholder="e.g., Space Exploration, World History, Python..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-12 text-base bg-background"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Difficulty</Label>
              <Select value={difficulty} onValueChange={(v) => setDifficulty(v as any)}>
                <SelectTrigger className="h-12 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-success" /> Easy
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" /> Medium
                    </span>
                  </SelectItem>
                  <SelectItem value="hard">
                    <span className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-destructive" /> Hard
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numQ" className="text-sm font-medium text-foreground">
                Questions
              </Label>
              <Input
                id="numQ"
                type="number"
                min={1}
                max={20}
                value={numQuestions}
                onChange={(e) => setNumQuestions(Math.min(20, Math.max(1, +e.target.value)))}
                className="h-12 text-base bg-background"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full h-14 text-lg font-semibold rounded-xl"
            size="lg"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Quiz
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default QuizSetup;
