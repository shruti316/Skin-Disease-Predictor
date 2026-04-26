import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export interface ModelResult {
  name: string;
  topClass: string;
  confidence: number; // 0..1
  inferenceMs: number;
}

interface Props {
  results: ModelResult[];
}

export const EnsembleModels = ({ results }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {results.map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass-card p-4 hover-lift"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="font-display font-semibold text-sm">{r.name}</div>
          </div>
          <div className="text-xs text-muted-foreground mb-1">Top prediction</div>
          <div className="font-medium text-sm mb-3 truncate" title={r.topClass}>{r.topClass}</div>
          <div className="flex items-end justify-between mb-1">
            <span className="text-xs text-muted-foreground">Confidence</span>
            <span className="text-sm font-bold gradient-text">{(r.confidence * 100).toFixed(1)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${r.confidence * 100}%` }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              className="h-full bg-gradient-primary"
            />
          </div>
          <div className="text-[10px] text-muted-foreground mt-2">{r.inferenceMs}ms</div>
        </motion.div>
      ))}
    </div>
  );
};
