import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Download, RotateCcw, CheckCircle2, Activity, Flame } from "lucide-react";
import jsPDF from "jspdf";
import type { PredictPayload } from "./PredictionForm";

export type PredictionResult = {
  topClass: string;
  confidence: number;
  description: string;
  probabilities: { name: string; value: number }[];
};

const ResultSection = ({ payload, result, onReset }: { payload: PredictPayload; result: PredictionResult; onReset: () => void }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    const margin = 15;
    let y = 20;
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, 210, 8, "F");
    doc.setFontSize(20); doc.setTextColor(20);
    doc.text("DermaScan AI — Diagnostic Report", margin, y); y += 10;
    doc.setFontSize(10); doc.setTextColor(110);
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y); y += 12;

    doc.setFontSize(12); doc.setTextColor(20);
    doc.text("Subject", margin, y); y += 6;
    doc.setFontSize(10); doc.setTextColor(80);
    doc.text(`Category: ${payload.category}`, margin, y); y += 5;
    if (payload.name) { doc.text(`Name: ${payload.name}`, margin, y); y += 5; }
    if (payload.animalType) { doc.text(`Animal: ${payload.animalType}`, margin, y); y += 5; }
    doc.text(`Age: ${payload.age}`, margin, y); y += 5;
    if (payload.gender) { doc.text(`Gender: ${payload.gender}`, margin, y); y += 5; }
    doc.text(`Symptoms: ${payload.symptoms || "—"}`, margin, y, { maxWidth: 180 }); y += 10;

    doc.setFontSize(12); doc.setTextColor(20);
    doc.text("Prediction", margin, y); y += 7;
    doc.setFontSize(16); doc.setTextColor(99, 102, 241);
    doc.text(result.topClass, margin, y); y += 7;
    doc.setFontSize(11); doc.setTextColor(60);
    doc.text(`Confidence: ${result.confidence}%`, margin, y); y += 8;
    doc.setFontSize(10); doc.setTextColor(90);
    doc.text(result.description, margin, y, { maxWidth: 180 }); y += 16;

    doc.setFontSize(12); doc.setTextColor(20);
    doc.text("Probabilities", margin, y); y += 6;
    result.probabilities.forEach((p) => {
      doc.setFontSize(10); doc.setTextColor(60);
      doc.text(p.name, margin, y);
      doc.setDrawColor(220); doc.setFillColor(240, 240, 240);
      doc.rect(margin + 60, y - 3.5, 100, 4, "F");
      doc.setFillColor(99, 102, 241);
      doc.rect(margin + 60, y - 3.5, Number(p.value), 4, "F");
      doc.text(`${p.value}%`, margin + 165, y);
      y += 7;
    });

    if (payload.imageUrl) {
      try { doc.addImage(payload.imageUrl, "JPEG", margin, y + 4, 60, 60); } catch {}
    }
    doc.setFontSize(8); doc.setTextColor(150);
    doc.text("This report is for research/educational use and is not a medical diagnosis.", margin, 285);
    doc.save(`dermascan-${result.topClass.toLowerCase().replace(/\s/g, "-")}.pdf`);
  };

  const COLORS = ["hsl(250 95% 65%)", "hsl(280 90% 65%)", "hsl(200 95% 60%)", "hsl(220 30% 50%)", "hsl(220 20% 40%)"];

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* hero result */}
      <div className="relative overflow-hidden glass-strong rounded-3xl p-8 shadow-elegant">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-glow" />
              Analysis complete
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">{result.topClass}</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">{result.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={downloadPDF} className="bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-glow hover:scale-105 transition-transform">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button onClick={onReset} className="glass px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors">
                <RotateCcw className="w-4 h-4" /> Analyze another case
              </button>
            </div>
          </div>
          <div className="relative h-48 md:h-56">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: result.confidence }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "hsl(var(--muted))" }} dataKey="value" cornerRadius={20} fill="url(#confGrad)" />
                <defs>
                  <linearGradient id="confGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="hsl(250 95% 65%)" />
                    <stop offset="100%" stopColor="hsl(280 90% 65%)" />
                  </linearGradient>
                </defs>
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-4xl font-display font-bold text-gradient">{result.confidence}%</div>
              <div className="text-xs text-muted-foreground">confidence</div>
            </div>
          </div>
        </div>
      </div>

      {/* heatmap + image */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-primary-glow" />
            <h3 className="font-semibold">Original image</h3>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
            {payload.imageUrl && <img src={payload.imageUrl} alt="" className="w-full h-full object-cover" />}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-accent" />
              <h3 className="font-semibold">Grad-CAM heatmap</h3>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />Low</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" />Med</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />High</span>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            {payload.imageUrl && <img src={payload.imageUrl} alt="" className="w-full h-full object-cover" />}
            <div
              className="absolute inset-0 mix-blend-screen opacity-80"
              style={{
                background:
                  "radial-gradient(circle at 55% 45%, rgba(239,68,68,0.85) 0%, rgba(250,204,21,0.7) 25%, rgba(59,130,246,0.5) 50%, transparent 70%), radial-gradient(circle at 30% 65%, rgba(239,68,68,0.6) 0%, rgba(250,204,21,0.4) 20%, transparent 45%)",
              }}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
          </div>
          <p className="text-xs text-muted-foreground mt-3">Red regions show pixels that influenced the prediction the most.</p>
        </div>
      </div>

      {/* graph */}
      <div className="glass rounded-3xl p-6">
        <h3 className="font-semibold mb-1">Probability distribution</h3>
        <p className="text-xs text-muted-foreground mb-4">Top candidate classes ranked by model confidence.</p>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={result.probabilities} layout="vertical" margin={{ left: 20, right: 30 }}>
              <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {result.probabilities.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
