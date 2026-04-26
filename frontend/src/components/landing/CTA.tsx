import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 md:p-16 text-center shadow-elegant"
        >
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-glow/40 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Take the First Step Toward<br/>Smarter Skin Care
            </h2>
            <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8 text-lg">
              Try our AI scanner now — free, private, and explainable.
            </p>
            <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 shadow-glow">
              <Link to="/predict">
                Try AI Scan Now <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
