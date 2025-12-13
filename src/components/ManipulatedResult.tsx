import { X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ManipulatedResultProps {
  original: string;
  manipulated: string;
  type: string;
  onClose: () => void;
}

const typeLabels: Record<string, { label: string; color: string }> = {
  rephrase: { label: "Rephrased", color: "text-primary" },
  simplify: { label: "Simplified", color: "text-green" },
  advanced: { label: "Advanced", color: "text-amber" },
  similar: { label: "Similar Question", color: "text-purple" },
};

export function ManipulatedResult({ original, manipulated, type, onClose }: ManipulatedResultProps) {
  const [copied, setCopied] = useState(false);
  const typeInfo = typeLabels[type] || { label: type, color: "text-primary" };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(manipulated);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Question copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl p-6 shadow-2xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="mb-6">
          <span className={`text-sm font-semibold ${typeInfo.color}`}>
            {typeInfo.label} Version
          </span>
          <h3 className="text-xl font-bold text-foreground mt-1">
            AI-Generated Question Variation
          </h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Original</p>
            <p className="text-sm text-foreground/70 whitespace-pre-line font-mono">{original}</p>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary uppercase tracking-wide mb-2">Generated</p>
            <p className="text-sm text-foreground whitespace-pre-line font-mono leading-relaxed">
              {manipulated}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="glow" onClick={handleCopy} className="gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Question"}
          </Button>
        </div>
      </div>
    </div>
  );
}
