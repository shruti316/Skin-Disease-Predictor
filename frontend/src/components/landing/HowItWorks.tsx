import { motion } from "framer-motion";
import { Upload, Brain, Gauge, Eye, FileText } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Image", desc: "Provide a clear, well-lit photo of the affected skin area." },
  { icon: Brain, title: "AI Analyzes", desc: "Five deep-learning models inspect the image in parallel." },
  { icon: Gauge, title: "Get Confidence", desc: "Receive class probabilities and a confidence score." },
  { icon: Eye, title: "Visual Heatmap", desc: "Grad-CAM highlights the regions that drove the prediction." },
  { icon: FileText, title: "Download Report", desc: "Export a PDF summary or consult a dermatologist." },
];

export const HowItWorks = () => {
  return (
    <section id="how" className="py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Process</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How to Use the Platform</h2>
          <p className="text-muted-foreground text-lg">
            From upload to explainable AI results in less than three seconds.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative glass-card p-6 hover-lift group"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-elegant">
                {i + 1}
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all duration-300">
                <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
