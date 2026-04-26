import { motion } from "framer-motion";
import {
  Cpu,
  Gauge,
  ScanEye,
  FileText,
  History,
  UploadCloud,
  Images,
  Smartphone,
} from "lucide-react";

const features = [
  { icon: Cpu, title: "AI-Based Detection", desc: "State-of-the-art CNN trained on dermatology imagery." },
  { icon: Gauge, title: "Confidence Dashboard", desc: "Calibrated probability score for every prediction." },
  { icon: ScanEye, title: "Grad-CAM Explanation", desc: "See exactly where the AI is looking on your skin." },
  { icon: FileText, title: "PDF Medical Summary", desc: "Shareable report you can take to your doctor." },
  { icon: History, title: "Prediction History", desc: "Track changes over time with secure timeline." },
  { icon: UploadCloud, title: "Fast Secure Upload", desc: "Encrypted transit, ephemeral storage by default." },
  { icon: Images, title: "Multi-Image Scan", desc: "Compare multiple angles in a single session." },
  { icon: Smartphone, title: "Responsive Web App", desc: "Works flawlessly on phone, tablet, and desktop." },
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Platform
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Built for clarity, speed & trust
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Every feature is engineered for an effortless dermatology experience.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="hover-lift group relative overflow-hidden bg-gradient-card rounded-2xl p-6 border border-border/60 shadow-card"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
              <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-soft">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-semibold text-base">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
