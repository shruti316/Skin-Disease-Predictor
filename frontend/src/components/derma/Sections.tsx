import { Brain, Upload, LineChart, FileDown, MousePointerClick, Camera, MessageSquare, FileText, Image as ImageIcon, Activity, Zap, Heart } from "lucide-react";

export const About = () => (
  <section id="about" className="py-24 mx-auto max-w-7xl px-6">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-block px-3 py-1 glass rounded-full text-xs font-medium mb-4">About</div>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Explainable AI for <span className="text-gradient">dermatology</span> — built for both species.
        </h2>
        <p className="text-muted-foreground mt-5 text-lg">
          DermaScan combines a CNN classifier with Grad-CAM visual explanations so you can see
          exactly which regions drove the prediction. Designed for clinics, vets and curious users alike.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { i: <Brain className="w-5 h-5" />, t: "AI / ML core" },
            { i: <Heart className="w-5 h-5" />, t: "Human + animal" },
            { i: <LineChart className="w-5 h-5" />, t: "Insights & graphs" },
            { i: <FileDown className="w-5 h-5" />, t: "PDF reports" },
          ].map((x) => (
            <div key={x.t} className="glass rounded-xl p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground">{x.i}</div>
              <span className="font-medium text-sm">{x.t}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20" />
        <div className="relative glass-strong rounded-3xl p-8 aspect-square flex items-center justify-center overflow-hidden">
          <div className="absolute inset-8 rounded-2xl bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 animate-pulse-glow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_70%)]" />
          <Activity className="w-32 h-32 text-primary-glow animate-float relative z-10" />
          {/* orbiting dots */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-glow" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-glow" />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-secondary shadow-glow" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-glow shadow-glow" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const HowItWorks = () => {
  const steps = [
    { i: <MousePointerClick className="w-6 h-6" />, t: "Choose category", d: "Pick Human or Animal to tailor the model." },
    { i: <Camera className="w-6 h-6" />, t: "Upload & describe", d: "Add an image and any symptoms or details." },
    { i: <Brain className="w-6 h-6" />, t: "AI analyzes", d: "Our CNN + Grad-CAM runs an explainable inference." },
    { i: <FileText className="w-6 h-6" />, t: "Get report", d: "Prediction, heatmap, charts and downloadable PDF." },
  ];
  return (
    <section id="how" className="py-24 mx-auto max-w-7xl px-6">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-block px-3 py-1 glass rounded-full text-xs font-medium mb-4">Workflow</div>
        <h2 className="text-4xl md:text-5xl font-bold">How it works</h2>
        <p className="text-muted-foreground mt-4">From snapshot to insight in four simple steps.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <div
            key={s.t}
            className="group relative glass rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all"
          >
            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-glow">
              {i + 1}
            </div>
            <div className="p-3 rounded-xl bg-gradient-primary text-primary-foreground inline-flex mb-4 group-hover:scale-110 transition-transform">
              {s.i}
            </div>
            <h3 className="font-semibold text-lg">{s.t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const WhyBetter = () => {
  const items = [
    { t: "Faster diagnosis", d: "Sub-second inference on every scan." },
    { t: "AI accuracy", d: "Trained on diverse dermatological datasets." },
    { t: "Humans + animals", d: "One platform, two species — unique." },
    { t: "Effortless UX", d: "Built for clinicians and pet owners." },
    { t: "Rich reports", d: "PDF + graphs + heatmap overlays." },
    { t: "Explainable", d: "Grad-CAM shows the why behind the what." },
  ];
  return (
    <section className="py-24 mx-auto max-w-7xl px-6">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-block px-3 py-1 glass rounded-full text-xs font-medium mb-4">Why DermaScan</div>
        <h2 className="text-4xl md:text-5xl font-bold">Built differently.</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((it) => (
          <div key={it.t} className="glass rounded-2xl p-6 hover:border-primary/50 hover:bg-white/10 transition-all border border-transparent">
            <Zap className="w-5 h-5 text-primary-glow mb-3" />
            <h3 className="font-semibold">{it.t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Features = () => {
  const f = [
    { i: <ImageIcon className="w-6 h-6" />, t: "Image-based prediction", d: "Upload a photo, get a class + confidence." },
    { i: <MessageSquare className="w-6 h-6" />, t: "Symptom-based input", d: "Describe what you see for richer context." },
    { i: <FileDown className="w-6 h-6" />, t: "PDF report", d: "Shareable, professional one-page summary." },
    { i: <LineChart className="w-6 h-6" />, t: "Graphical analysis", d: "Probability bars and confidence breakdown." },
    { i: <Brain className="w-6 h-6" />, t: "Grad-CAM heatmaps", d: "See which pixels drove the verdict." },
    { i: <Upload className="w-6 h-6" />, t: "Drag & drop UI", d: "Clean, fast, and keyboard friendly." },
  ];
  return (
    <section id="features" className="py-24 mx-auto max-w-7xl px-6">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-block px-3 py-1 glass rounded-full text-xs font-medium mb-4">Features</div>
        <h2 className="text-4xl md:text-5xl font-bold">Everything in one place.</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {f.map((x) => (
          <div key={x.t} className="group relative overflow-hidden glass rounded-2xl p-6 hover:-translate-y-1 transition-all">
            <div className="absolute -inset-1 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            <div className="relative">
              <div className="p-3 rounded-xl bg-gradient-primary text-primary-foreground inline-flex mb-4">
                {x.i}
              </div>
              <h3 className="font-semibold text-lg">{x.t}</h3>
              <p className="text-sm text-muted-foreground mt-2">{x.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
