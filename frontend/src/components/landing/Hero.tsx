import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Activity, Lock } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import heroImg from "@/assets/hero-skin-ai.jpg";

const stats = [
  { end: 95, suffix: "%+", label: "Accuracy", decimals: 0 },
  { end: 10, suffix: "+", label: "Detectable Conditions", decimals: 0 },
  { end: 2.8, suffix: "s", label: "Avg. Analysis Time", decimals: 1 },
  { end: 100, suffix: "%", label: "AI Explainability", decimals: 0 },
];

export const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-hero -z-10" />
      <div className="absolute inset-0 bg-grid opacity-30 -z-10" />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium text-primary mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-powered dermatology assistant
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              AI Powered<br />
              <span className="gradient-text">Skin Disease</span><br />
              Detection
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Upload a skin image and receive intelligent preliminary analysis,
              confidence score, and Grad-CAM visual insights in seconds — powered
              by an ensemble of five state-of-the-art deep learning models.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl" className="rounded-full">
                <Link to="/predict">
                  Start Prediction <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl" className="rounded-full">
                <a href="#how">Learn More</a>
              </Button>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5 text-primary" />
              HIPAA-aware · Encrypted uploads · No image stored without consent
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative glass-card overflow-hidden animate-float">
              <img
                src={heroImg}
                alt="AI skin analysis"
                width={800}
                height={800}
                className="w-full h-auto"
              />
              {/* Scan line overlay */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow animate-scan" />
              </div>
            </div>

            {/* Floating Confidence badge */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -top-4 -left-4 md:-left-10 glass-card px-4 py-3 flex items-center gap-3 shadow-elegant"
            >
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground leading-none mb-1">Confidence</div>
                <div className="font-display font-bold text-lg leading-none">
                  <AnimatedCounter end={96.4} decimals={1} suffix="%" />
                </div>
              </div>
            </motion.div>

            {/* Floating Diagnosis badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-4 -right-2 md:-right-8 glass-card px-4 py-3 flex items-center gap-3 shadow-elegant"
            >
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground leading-none mb-1">Diagnosis</div>
                <div className="font-display font-semibold text-sm leading-none">Eczema · Mild</div>
              </div>
            </motion.div>

            {/* Floating mini-stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute top-1/2 -right-4 md:-right-10 -translate-y-1/2 glass-card px-3 py-2 flex items-center gap-2 shadow-soft"
            >
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold">Live scan</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          {stats.map((s, i) => (
            <div key={i} className="glass-card p-6 text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                <AnimatedCounter end={s.end} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
