import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Shield, Zap } from "lucide-react";

const Hero = () => (
  <section className="relative pt-36 pb-24 overflow-hidden">
    {/* floating blobs */}
    <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blob" />
    <div className="absolute top-40 right-0 w-[28rem] h-[28rem] bg-accent/25 rounded-full blur-3xl animate-blob [animation-delay:4s]" />
    <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-blob [animation-delay:8s]" />

    <div className="relative mx-auto max-w-7xl px-6 text-center">
      <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
        <Sparkles className="w-4 h-4 text-primary-glow" />
        <span className="text-xs font-medium tracking-wide">Powered by Grad-CAM Explainable AI</span>
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight animate-fade-in-up [animation-delay:100ms]">
        AI-Powered <br />
        <span className="text-gradient">Skin Disease</span> Predictor
      </h1>

      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up [animation-delay:200ms]">
        Detect skin conditions in humans and animals using advanced machine learning
        with visual heatmaps and confidence scores you can trust.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:300ms]">
        <Link
          to="/predict"
          className="group bg-gradient-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold shadow-glow hover:shadow-elegant hover:scale-105 transition-all flex items-center gap-2"
        >
          Start Prediction
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href="#how"
          className="glass px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all"
        >
          How it works
        </a>
      </div>

      {/* stat row */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up [animation-delay:500ms]">
        {[
          { k: "94%", v: "Avg accuracy" },
          { k: "<2s", v: "Per scan" },
          { k: "40+", v: "Conditions" },
          { k: "2-in-1", v: "Human + Animal" },
        ].map((s) => (
          <div key={s.v} className="glass rounded-2xl p-5 hover:bg-white/10 transition-colors">
            <div className="text-3xl font-display font-bold text-gradient">{s.k}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      {/* preview card */}
      <div className="mt-20 relative max-w-5xl mx-auto animate-fade-in-up [animation-delay:600ms]">
        <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-30" />
        <div className="relative glass-strong rounded-3xl p-8 shadow-elegant">
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <PreviewTile icon={<Shield className="w-5 h-5" />} title="Eczema" sub="Confidence 92%" pct={92} />
            <PreviewTile icon={<Zap className="w-5 h-5" />} title="Heatmap" sub="Grad-CAM overlay" pct={78} />
            <PreviewTile icon={<Sparkles className="w-5 h-5" />} title="Report" sub="Instant PDF" pct={100} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PreviewTile = ({ icon, title, sub, pct }: { icon: React.ReactNode; title: string; sub: string; pct: number }) => (
  <div className="rounded-2xl bg-card/40 border border-white/10 p-5 hover:border-primary/40 transition-colors">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 rounded-lg bg-gradient-primary text-primary-foreground">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${pct}%` }} />
    </div>
  </div>
);

export default Hero;
