import { ChemistryQuestion } from "@/data/chemistryQuestions";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, TrendingUp, Wand2 } from "lucide-react";

interface QuestionCardProps {
  question: ChemistryQuestion;
  onManipulate: (question: ChemistryQuestion, type: string) => void;
  isLoading: boolean;
}

export function QuestionCard({ question, onManipulate, isLoading }: QuestionCardProps) {
  return (
    <div className="group bg-gradient-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-glow animate-fade-in">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
            {question.id}
          </span>
          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
            {question.topic}
          </span>
        </div>
      </div>
      
      <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-sm mb-6 font-mono">
        {question.text}
      </p>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManipulate(question, 'rephrase')}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Rephrase
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManipulate(question, 'simplify')}
          disabled={isLoading}
          className="gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Simplify
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManipulate(question, 'advanced')}
          disabled={isLoading}
          className="gap-2"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Advanced
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManipulate(question, 'similar')}
          disabled={isLoading}
          className="gap-2"
        >
          <Wand2 className="w-3.5 h-3.5" />
          Similar
        </Button>
      </div>
    </div>
  );
}
