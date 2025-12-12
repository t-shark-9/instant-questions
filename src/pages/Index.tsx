import { useState } from "react";
import { chemistryQuestions, ChemistryQuestion } from "@/data/chemistryQuestions";
import { QuestionCard } from "@/components/QuestionCard";
import { ManipulatedResult } from "@/components/ManipulatedResult";
import { MoleculeBackground } from "@/components/MoleculeBackground";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Atom, Sparkles, Beaker } from "lucide-react";

interface ManipulationResult {
  original: string;
  manipulated: string;
  type: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ManipulationResult | null>(null);

  const handleManipulate = async (question: ChemistryQuestion, type: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('manipulate-question', {
        body: { question: question.text, manipulationType: type }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult({
        original: question.text,
        manipulated: data.manipulated,
        type: type
      });
    } catch (error) {
      console.error('Error manipulating question:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate question variation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <MoleculeBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <header className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Atom className="w-12 h-12 text-primary animate-float" />
              <Sparkles className="w-5 h-5 text-accent absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            IB Chemistry AI
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Transform your chemistry questions with AI-powered variations. 
            Rephrase, simplify, or create advanced versions instantly.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Beaker className="w-4 h-4 text-primary" />
              <span>{chemistryQuestions.length} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>4 Variation Types</span>
            </div>
          </div>
        </header>

        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Atom className="w-16 h-16 text-primary animate-spin" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-0 w-16 h-16 border-2 border-primary/30 rounded-full animate-ping" />
              </div>
              <p className="text-muted-foreground font-medium">Generating variation...</p>
            </div>
          </div>
        )}

        {/* Questions Grid */}
        <div className="space-y-4">
          {chemistryQuestions.map((question, index) => (
            <div key={question.id} style={{ animationDelay: `${index * 50}ms` }}>
              <QuestionCard
                question={question}
                onManipulate={handleManipulate}
                isLoading={isLoading}
              />
            </div>
          ))}
        </div>

        {/* Result Modal */}
        {result && (
          <ManipulatedResult
            original={result.original}
            manipulated={result.manipulated}
            type={result.type}
            onClose={() => setResult(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
