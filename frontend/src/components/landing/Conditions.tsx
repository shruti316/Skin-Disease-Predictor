import { motion } from "framer-motion";

const conditions = [
  { name: "Acne & Rosacea", desc: "Inflammatory facial skin conditions", emoji: "🔴" },
  { name: "Eczema", desc: "Dry, itchy inflamed patches", emoji: "🌿" },
  { name: "Psoriasis", desc: "Scaly, silvery plaques", emoji: "⚪" },
  { name: "Fungal Infection", desc: "Yeast or dermatophyte growth", emoji: "🍄" },
  { name: "Ringworm", desc: "Circular, ring-shaped rash", emoji: "⭕" },
  { name: "Vitiligo", desc: "Loss of skin pigmentation", emoji: "⚪" },
  { name: "Melanoma Warning", desc: "Suspicious mole patterns", emoji: "⚠️" },
  { name: "Dermatitis", desc: "Contact or atopic irritation", emoji: "💧" },
  { name: "Pigmentation", desc: "Hyper or hypo pigmentation", emoji: "🎨" },
  { name: "Skin Rash", desc: "General irritation or allergic reaction", emoji: "🌸" },
];

export const Conditions = () => {
  return (
    <section id="conditions" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-40 -z-10" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">Coverage</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Which Skin Conditions Require <span className="gradient-text">Evaluation</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI ensemble can flag and analyze the following common dermatological concerns.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {conditions.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 hover-lift cursor-pointer group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{c.emoji}</div>
              <h3 className="font-display font-semibold text-sm mb-1">{c.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
