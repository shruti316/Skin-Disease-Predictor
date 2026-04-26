import { motion } from "framer-motion";
import {
  Droplets,
  Flame,
  Layers,
  Bug,
  Circle,
  Snowflake,
  AlertTriangle,
  Sun,
  Palette,
  Sparkles,
} from "lucide-react";

const conditions = [
  { icon: Flame, name: "Acne & Rosacea", desc: "Inflammation & redness" },
  { icon: Snowflake, name: "Eczema", desc: "Dry, itchy patches" },
  { icon: Layers, name: "Psoriasis", desc: "Scaly plaques detection" },
  { icon: Bug, name: "Fungal Infection", desc: "Tinea & yeast patterns" },
  { icon: Circle, name: "Ringworm", desc: "Circular lesions" },
  { icon: Droplets, name: "Vitiligo", desc: "Pigment loss areas" },
  { icon: AlertTriangle, name: "Melanoma Signs", desc: "Suspicious moles" },
  { icon: Sparkles, name: "Dermatitis", desc: "Contact reactions" },
  { icon: Palette, name: "Pigmentation", desc: "Discoloration disorders" },
  { icon: Sun, name: "Skin Rash", desc: "General irritation" },
];

export default function Conditions() {
  return (
    <section id="conditions" className="py-24 sm:py-32 bg-secondary/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Coverage
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Which Skin Conditions{" "}
            <span className="text-gradient-primary">Our AI Evaluates</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Trained on diverse dermatology datasets to recognize a wide range of
            common and concerning conditions.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {conditions.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group hover-lift bg-card rounded-2xl p-5 border border-border/60 shadow-soft cursor-pointer"
            >
              <div className="h-11 w-11 rounded-xl bg-accent/30 grid place-items-center text-primary group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-sm">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
