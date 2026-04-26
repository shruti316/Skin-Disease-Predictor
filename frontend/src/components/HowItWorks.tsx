import { motion } from "framer-motion";
import { Upload, Brain, Activity, Eye, FileDown } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Image",
    desc: "Capture or upload a clear, well-lit photo of the affected skin area.",
  },
  {
    icon: Brain,
    title: "AI Analyzes",
    desc: "Our deep-learning model processes the image across thousands of features.",
  },
  {
    icon: Activity,
    title: "Get Prediction",
    desc: "Receive the most likely condition with a calibrated confidence score.",
  },
  {
    icon: Eye,
    title: "Heatmap Insight",
    desc: "Grad-CAM overlay highlights the exact regions driving the prediction.",
  },
  {
    icon: FileDown,
    title: "Report & Action",
    desc: "Download a PDF summary or seek a licensed dermatologist when needed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            How to Use the Platform
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Five simple steps from a photo to an explainable AI assessment.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="hover-lift relative bg-card rounded-2xl p-6 shadow-card border border-border/60"
            >
              <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold grid place-items-center shadow-glow">
                {i + 1}
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-soft">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
