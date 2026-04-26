import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Aisha Khan",
    role: "Dermatologist",
    quote:
      "An impressive triage tool. The Grad-CAM overlays make it easy to discuss findings with patients during consultations.",
    initials: "AK",
  },
  {
    name: "Marcus Lee",
    role: "Patient",
    quote:
      "I noticed a strange patch and got an instant preliminary read. Booked a real appointment the same day — thank you.",
    initials: "ML",
  },
  {
    name: "Priya Sharma",
    role: "Wellness Coach",
    quote:
      "I recommend it to clients who want a quick, private check before deciding to see a specialist. Beautifully simple.",
    initials: "PS",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Voices
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Loved by patients & clinicians
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="hover-lift bg-gradient-card rounded-2xl p-7 border border-border/60 shadow-card"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-foreground leading-relaxed">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
