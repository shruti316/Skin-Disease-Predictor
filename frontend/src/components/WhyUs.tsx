import { motion } from "framer-motion";
import { Zap, Lightbulb, Smile, BellRing, Lock, ClipboardList } from "lucide-react";

const items = [
  { icon: Zap, title: "Fast Results", desc: "Predictions in under 3 seconds, even on mobile networks." },
  { icon: Lightbulb, title: "Explainable AI", desc: "Heatmaps show why the model made each decision." },
  { icon: Smile, title: "User Friendly", desc: "Designed for everyone — no medical jargon required." },
  { icon: BellRing, title: "Early Awareness", desc: "Catch warning signs early and seek timely care." },
  { icon: Lock, title: "Private & Secure", desc: "End-to-end encryption and zero-retention default." },
  { icon: ClipboardList, title: "Smart Reporting", desc: "Doctor-ready PDF summaries in one click." },
];

export default function WhyUs() {
  return (
    <section id="why" className="py-24 sm:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Why DermaSense
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Trusted by people who care about{" "}
            <span className="text-gradient-primary">their skin</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="hover-lift bg-card rounded-2xl p-7 border border-border/60 shadow-soft flex gap-5"
            >
              <div className="shrink-0 h-12 w-12 rounded-xl bg-mint grid place-items-center text-mint-foreground">
                <it.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{it.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
