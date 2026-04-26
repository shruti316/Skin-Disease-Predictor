import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Dr. Anika Sharma", role: "Dermatologist, Mumbai", quote: "The Grad-CAM overlays are remarkably aligned with what I'd visually inspect. A great triage assistant." },
  { name: "Rahul Verma", role: "Patient", quote: "I noticed an unusual patch and used DermaSense before booking. The clear explanation gave me confidence to act early." },
  { name: "Priya N.", role: "Telehealth Lead", quote: "Beautiful UX, fast inference, and the reports are clinic-ready. Our patients love it." },
];

export const Testimonials = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Trust</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by patients & <span className="gradient-text">clinicians</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-7 hover-lift">
              <div className="flex gap-1 mb-4 text-warning">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  {t.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
