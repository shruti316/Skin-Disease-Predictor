import { Brain } from "lucide-react";

const Loader = () => (
  <div className="py-24 flex flex-col items-center justify-center animate-fade-in-up">
    <div className="relative w-40 h-40">
      <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-30 blur-2xl animate-pulse-glow" />
      <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin-slow" />
      <div className="absolute inset-3 rounded-full border-2 border-dashed border-accent/40 animate-spin-slow [animation-direction:reverse]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-5 rounded-2xl bg-gradient-primary shadow-glow">
          <Brain className="w-10 h-10 text-primary-foreground" />
        </div>
      </div>
    </div>
    <h3 className="mt-8 text-2xl font-display font-bold text-gradient">Analyzing with AI…</h3>
    <p className="text-muted-foreground mt-2 text-sm">Running CNN inference and generating Grad-CAM heatmap.</p>
    <div className="mt-6 w-64 h-1.5 bg-muted rounded-full overflow-hidden">
      <div className="h-full w-1/3 bg-gradient-primary rounded-full animate-shimmer"
        style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))" }} />
    </div>
  </div>
);

export default Loader;
