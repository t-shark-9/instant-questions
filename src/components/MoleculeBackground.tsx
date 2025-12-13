export function MoleculeBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan/5 rounded-full blur-3xl animate-float" />
      
      {/* Molecule-like dots */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="molecules" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="50" cy="30" r="1" fill="hsl(var(--accent))" />
            <circle cx="80" cy="60" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="30" cy="80" r="1" fill="hsl(var(--cyan))" />
            <line x1="10" y1="10" x2="50" y2="30" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.5" />
            <line x1="50" y1="30" x2="80" y2="60" stroke="hsl(var(--accent))" strokeWidth="0.3" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#molecules)" />
      </svg>
    </div>
  );
}
