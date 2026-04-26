import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-skin-ai.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-gradient-hero"
    >
      {/* animated mesh blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-gradient-mesh opacity-30 blur-3xl animate-gradient" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-gradient-mesh opacity-25 blur-3xl animate-gradient" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-6 shadow-soft">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered dermatology assistant
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            AI Powered{" "}
            <span className="text-gradient-primary">Skin Disease</span>{" "}
            Detection
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Upload a skin image and receive intelligent preliminary analysis,
            confidence score, and visual heatmap insights in seconds — backed
            by clinically-trained deep learning models.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#cta"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              Start Prediction
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2 rounded-xl glass px-7 py-4 text-sm font-semibold text-foreground hover:bg-secondary transition-all"
            >
              Learn More
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" />
            HIPAA-aware · Encrypted uploads · No image stored without consent
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative mx-auto max-w-lg">
            <div className="absolute -inset-6 bg-gradient-mesh opacity-40 blur-3xl rounded-full animate-gradient" />
            <div className="relative rounded-3xl overflow-hidden glass shadow-elegant p-3 animate-float">
              <img
                src={heroImg}
                alt="AI dermatology scan visualization"
                width={1024}
                height={1024}
                className="rounded-2xl w-full h-auto"
              />
            </div>

            {/* floating badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -left-4 top-10 glass rounded-2xl px-4 py-3 shadow-card hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-mint grid place-items-center">
                  <ShieldCheck className="h-5 w-5 text-mint-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="text-sm font-bold">96.4%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -right-4 bottom-12 glass rounded-2xl px-4 py-3 shadow-card hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse-glow" />
                <div>
                  <p className="text-xs text-muted-foreground">Diagnosis</p>
                  <p className="text-sm font-bold">Eczema · Mild</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
