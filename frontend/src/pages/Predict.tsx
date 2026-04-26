import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/predict/ImageUploader";
import { GradCamOverlay } from "@/components/predict/GradCamOverlay";
import { EnsembleModels, ModelResult } from "@/components/predict/EnsembleModels";
import {
  Sparkles, Activity, Download, RefreshCw, AlertTriangle,
  CheckCircle2, Eye, Layers, Stethoscope, Loader2
} from "lucide-react";
import { toast } from "sonner";

type Stage = "idle" | "analyzing" | "done";

interface Prediction {
  topClass: string;
  topConfidence: number;
  classes: { name: string; prob: number }[];
  models: ModelResult[];
  severity: "low" | "moderate" | "high";
}

const CLASS_POOL = [
  "Eczema", "Acne & Rosacea", "Psoriasis", "Fungal Infection",
  "Ringworm", "Vitiligo", "Melanoma (suspicious)", "Contact Dermatitis",
  "Pigmentation Disorder", "Benign Skin Rash"
];

const MODEL_NAMES = ["ResNet-50", "EfficientNet-B3", "DenseNet-121", "Inception-V3", "ViT-Base"];

// Simulate ensemble inference
function runEnsemble(): Prediction {
  const top = CLASS_POOL[Math.floor(Math.random() * CLASS_POOL.length)];
  const topConf = 0.78 + Math.random() * 0.18;

  const probs = CLASS_POOL.map((c) =>
    c === top ? topConf : Math.random() * (1 - topConf) * 0.4
  );
  const sum = probs.reduce((a, b) => a + b, 0);
  const classes = CLASS_POOL.map((c, i) => ({ name: c, prob: probs[i] / sum }))
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 5);

  const models: ModelResult[] = MODEL_NAMES.map((name) => {
    const agree = Math.random() > 0.2;
    return {
      name,
      topClass: agree ? top : CLASS_POOL[Math.floor(Math.random() * CLASS_POOL.length)],
      confidence: 0.7 + Math.random() * 0.28,
      inferenceMs: Math.floor(120 + Math.random() * 380),
    };
  });

  const severity: Prediction["severity"] =
    top.toLowerCase().includes("melanoma") ? "high" : topConf > 0.88 ? "moderate" : "low";

  return { topClass: top, topConfidence: topConf, classes, models, severity };
}

const severityStyles = {
  low:      { label: "Low concern",      cls: "bg-accent/10 text-accent border-accent/30",         icon: CheckCircle2 },
  moderate: { label: "Moderate concern", cls: "bg-warning/10 text-warning border-warning/30",       icon: Eye },
  high:     { label: "High concern",     cls: "bg-destructive/10 text-destructive border-destructive/30", icon: AlertTriangle },
};

const Predict = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [progress, setProgress] = useState(0);

  const analyze = async () => {
    if (!preview) return;
    setStage("analyzing");
    setProgress(0);
    setPrediction(null);

    // Simulated progress
    const steps = [
      "Preprocessing image...",
      "Running ResNet-50...",
      "Running EfficientNet-B3...",
      "Running DenseNet-121...",
      "Running Inception-V3...",
      "Running ViT-Base...",
      "Computing Grad-CAM...",
      "Aggregating ensemble...",
    ];
    for (let i = 0; i < steps.length; i++) {
      toast.message(steps[i]);
      await new Promise((r) => setTimeout(r, 350));
      setProgress(((i + 1) / steps.length) * 100);
    }

    setPrediction(runEnsemble());
    setStage("done");
    toast.success("Analysis complete");
  };

  const reset = () => {
    setPreview(null);
    setPrediction(null);
    setStage("idle");
    setProgress(0);
  };

  const downloadReport = () => {
    if (!prediction) return;
    const content = `DERMASCAN AI — PRELIMINARY REPORT
Generated: ${new Date().toLocaleString()}

TOP PREDICTION: ${prediction.topClass}
CONFIDENCE: ${(prediction.topConfidence * 100).toFixed(2)}%
SEVERITY: ${prediction.severity.toUpperCase()}

CLASS PROBABILITIES:
${prediction.classes.map(c => `  - ${c.name}: ${(c.prob * 100).toFixed(2)}%`).join("\n")}

MODEL ENSEMBLE:
${prediction.models.map(m => `  - ${m.name}: ${m.topClass} (${(m.confidence * 100).toFixed(1)}%, ${m.inferenceMs}ms)`).join("\n")}

DISCLAIMER: This is a preliminary informational result and not a medical diagnosis.
`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dermascan-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sev = prediction ? severityStyles[prediction.severity] : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              AI Skin Analysis Studio
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload & <span className="gradient-text">Analyze</span>
            </h1>
            <p className="text-muted-foreground">
              Our 5-model ensemble inspects your image and produces a Grad-CAM
              heatmap explaining which regions drove the prediction.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Upload / image */}
            <div className="space-y-5">
              {stage !== "done" ? (
                <ImageUploader
                  preview={preview}
                  onFile={(_, url) => setPreview(url)}
                  onClear={reset}
                />
              ) : (
                preview && (
                  <div className="glass-card p-3 overflow-hidden">
                    <div className="flex items-center justify-between px-2 py-2 mb-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Layers className="w-4 h-4 text-primary" />
                        Grad-CAM Heatmap
                      </div>
                      <span className="text-xs text-muted-foreground">Mix-blend overlay</span>
                    </div>
                    <GradCamOverlay imageUrl={preview} intensity={0.7} />
                    {/* Color scale */}
                    <div className="mt-3 px-2">
                      <div className="h-2 rounded-full heatmap-gradient" />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>Low attention</span>
                        <span>High attention</span>
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* Action bar */}
              {preview && stage === "idle" && (
                <div className="flex gap-3">
                  <Button onClick={analyze} variant="hero" size="lg" className="flex-1">
                    <Activity className="w-4 h-4" />
                    Run AI Analysis
                  </Button>
                  <Button onClick={reset} variant="outline" size="lg">
                    Reset
                  </Button>
                </div>
              )}

              {stage === "analyzing" && (
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span className="font-medium">Analyzing with 5 models...</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-primary"
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 text-right">
                    {progress.toFixed(0)}%
                  </div>
                </div>
              )}

              {stage === "done" && (
                <div className="flex flex-wrap gap-3">
                  <Button onClick={downloadReport} variant="hero" size="lg">
                    <Download className="w-4 h-4" /> Download Report
                  </Button>
                  <Button onClick={reset} variant="outline" size="lg">
                    <RefreshCw className="w-4 h-4" /> New Scan
                  </Button>
                  <Button variant="glass" size="lg">
                    <Stethoscope className="w-4 h-4" /> Find a Doctor
                  </Button>
                </div>
              )}
            </div>

            {/* Right: Results */}
            <div className="space-y-5">
              <AnimatePresence mode="wait">
                {stage === "idle" && !preview && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-10 text-center"
                  >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <Eye className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">Awaiting image</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a clear close-up of the affected skin area to begin analysis.
                    </p>
                  </motion.div>
                )}

                {stage === "idle" && preview && (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8"
                  >
                    <h3 className="font-display font-semibold text-lg mb-2">Ready to analyze</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your image is loaded. Click "Run AI Analysis" to engage the 5-model ensemble
                      and generate a Grad-CAM explanation.
                    </p>
                    <ul className="space-y-2 text-sm">
                      {["Image preprocessing", "5-model parallel inference", "Grad-CAM activation map", "Ensemble aggregation"].map((s) => (
                        <li key={s} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent" /> {s}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {stage === "done" && prediction && sev && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    {/* Top prediction card */}
                    <div className="glass-card p-6 relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
                      <div className="relative">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${sev.cls} mb-3`}>
                          <sev.icon className="w-3.5 h-3.5" />
                          {sev.label}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                          Top Prediction
                        </div>
                        <h2 className="text-3xl font-bold mb-2">{prediction.topClass}</h2>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold gradient-text">
                            {(prediction.topConfidence * 100).toFixed(1)}
                          </span>
                          <span className="text-lg text-muted-foreground">% confidence</span>
                        </div>
                      </div>
                    </div>

                    {/* Class probabilities */}
                    <div className="glass-card p-6">
                      <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Class Probabilities
                      </h3>
                      <div className="space-y-3">
                        {prediction.classes.map((c, i) => (
                          <div key={c.name}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className={i === 0 ? "font-semibold" : "text-muted-foreground"}>{c.name}</span>
                              <span className="font-medium tabular-nums">{(c.prob * 100).toFixed(1)}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${c.prob * 100}%` }}
                                transition={{ duration: 0.8, delay: i * 0.08 }}
                                className={i === 0 ? "h-full bg-gradient-primary" : "h-full bg-secondary/60"}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="glass-card p-4 border-l-4 border-warning flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Important:</strong> This is a preliminary
                        AI estimate intended for awareness only. Please consult a licensed
                        dermatologist for an actual diagnosis.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Ensemble model breakdown */}
          {stage === "done" && prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <div className="flex items-end justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold">5-Model Ensemble Breakdown</h2>
                  <p className="text-sm text-muted-foreground">Per-model predictions and inference times</p>
                </div>
              </div>
              <EnsembleModels results={prediction.models} />
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Predict;
