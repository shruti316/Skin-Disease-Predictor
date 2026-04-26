import { motion } from "framer-motion";
import { Brain, Gauge, Layers, FileText, History, Upload, Images, Smartphone, ShieldCheck, Zap, Eye, Sparkles } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Based Detection", desc: "Ensemble of 5 trained CNN models", color: "text-primary" },
  { icon: Gauge, title: "Confidence Dashboard", desc: "Per-class probability breakdown", color: "text-secondary" },
  { icon: Layers, title: "Grad-CAM Visualization", desc: "See exactly what the model focuses on", color: "text-accent" },
  { icon: FileText, title: "PDF Medical Summary", desc: "Downloadable clinical-style report", color: "text-primary" },
  { icon: History, title: "Prediction History", desc: "Track scans and trends over time", color: "text-secondary" },
  { icon: Upload, title: "Fast Secure Upload", desc: "End-to-end encrypted transfers", color: "text-accent" },
  { icon: Images, title: "Multi Image Scan", desc: "Analyze multiple angles at once", color: "text-primary" },
  { icon: Smartphone, title: "Responsive Web App", desc: "Works flawlessly on any device", color: "text-secondary" },
];

const why = [
  { icon: Zap, title: "Fast Results", desc: "Get analysis in under 3 seconds." },
  { icon: Eye, title: "Explainable AI", desc: "Heatmaps show the why behind every result." },
  { icon: Sparkles, title: "User Friendly", desc: "Designed for patients and clinicians alike." },
  { icon: ShieldCheck, title: "Private & Secure", desc: "Images processed with strict privacy." },
  { icon: Brain, title: "Early Awareness", desc: "Catch concerns before they escalate." },
  { icon: FileText, title: "Smart Reporting", desc: "Generate shareable medical summaries." },
];

export const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium <span className="gradient-text">Features</span></h2>
          <p className="text-muted-foreground text-lg">Everything you need for confident, explainable skin analysis.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6 hover-lift">
              <div className={`w-12 h-12 rounded-xl bg-card flex items-center justify-center shadow-soft mb-4 ${f.color}`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div id="about">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">Why Us</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose <span className="gradient-text">DermaSense</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {why.map((w, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-8 hover-lift">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-elegant mb-5">
                  <w.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{w.title}</h3>
                <p className="text-muted-foreground">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
