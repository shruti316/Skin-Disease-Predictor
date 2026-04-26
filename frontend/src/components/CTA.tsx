import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="py-24 sm:py-32 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden bg-gradient-primary p-10 sm:p-16 text-center shadow-elegant"
      >
        <div className="absolute inset-0 bg-gradient-mesh opacity-30 mix-blend-overlay animate-gradient" />
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-medium text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Free preliminary scan
          </div>
          <h2 className="mt-6 font-display text-3xl sm:text-5xl font-bold text-primary-foreground tracking-tight">
            Take the First Step Toward
            <br className="hidden sm:block" /> Smarter Skin Care
          </h2>
          <p className="mt-5 text-primary-foreground/90 max-w-xl mx-auto text-lg">
            Get an instant AI assessment with explainable results — no signup
            required for your first scan.
          </p>
          <a
            href="#"
            className="mt-8 group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-primary shadow-glow hover:-translate-y-0.5 transition-all"
          >
            Try AI Scan Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
