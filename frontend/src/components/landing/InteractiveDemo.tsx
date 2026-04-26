import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradCamOverlay } from "@/components/predict/GradCamOverlay";
import { Sparkles, ArrowRight, Eye, EyeOff } from "lucide-react";
import heroImg from "@/assets/hero-skin-ai.jpg";

/**
 * Interactive demo: lets visitors toggle the Grad-CAM heatmap overlay
 * and see different "predicted" conditions update in real time.
 */
const demoConditions = [
  { name: "Eczema", confidence: 0.94, hotspots: [{ x: 0.5, y: 0.55, r: 0.3, strength: 1 }, { x: 0.65, y: 0.4, r: 0.15, strength: 0.6 }] },
  { name: "Psoriasis", confidence: 0.89, hotspots: [{ x: 0.4, y: 0.5, r: 0.25, strength: 0.95 }, { x: 0.55, y: 0.65, r: 0.2, strength: 0.8 }] },
  { name: "Acne & Rosacea", confidence: 0.91, hotspots: [{ x: 0.5, y: 0.45, r: 0.32, strength: 1 }] },
  { name: "Fungal Infection", confidence: 0.87, hotspots: [{ x: 0.45, y: 0.55, r: 0.22, strength: 0.85 }, { x: 0.6, y: 0.6, r: 0.18, strength: 0.7 }] },
];

export const InteractiveDemo = () => {
  const [active, setActive] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const current = demoConditions[active];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-50 -z-10" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Live interactive preview
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            See <span className="gradient-text">Grad-CAM</span> in action
          </h2>
          <p className="text-muted-foreground text-lg">
            Tap a condition to watch the heatmap re-focus on different regions —
            this is exactly what the real prediction page does.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image with heatmap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative glass-card p-3">
              {showHeatmap ? (
                <GradCamOverlay
                  key={active}
                  imageUrl={heroImg}
                  intensity={0.75}
                  hotspots={current.hotspots}
                />
              ) : (
                <img src={heroImg} alt="Skin sample" className="w-full h-auto rounded-2xl" />
              )}
              <div className="flex items-center justify-between mt-3 px-2">
                <div className="text-xs text-muted-foreground">
                  Attention scale
                </div>
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  {showHeatmap ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showHeatmap ? "Hide" : "Show"} heatmap
                </button>
              </div>
              <div className="mt-2 px-2">
                <div className="h-2 rounded-full heatmap-gradient" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>Low</span><span>Medium</span><span>High</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div>
            <div className="space-y-3 mb-6">
              {demoConditions.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setActive(i)}
                  className={`w-full text-left glass-card p-4 transition-all duration-300 ${
                    i === active
                      ? "ring-2 ring-primary shadow-elegant scale-[1.02]"
                      : "hover:scale-[1.01] hover:shadow-soft"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${i === active ? "bg-primary animate-pulse" : "bg-muted-foreground/40"}`} />
                      <span className="font-semibold">{c.name}</span>
                    </div>
                    <span className={`text-sm font-bold ${i === active ? "gradient-text" : "text-muted-foreground"}`}>
                      {(c.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={i === active ? "h-full bg-gradient-primary" : "h-full bg-muted-foreground/30"}
                      initial={false}
                      animate={{ width: `${c.confidence * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </button>
              ))}
            </div>

            <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
              <Link to="/predict">
                Try with your own image <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
