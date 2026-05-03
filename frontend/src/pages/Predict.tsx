import { useState } from "react";
import Navbar from "@/components/derma/Navbar";
import Footer from "@/components/derma/Footer";
import PredictionForm, { PredictPayload } from "@/components/derma/PredictionForm";
import Loader from "@/components/derma/Loader";
import ResultSection, { PredictionResult } from "@/components/derma/ResultSection";
import { User, PawPrint, ArrowLeft } from "lucide-react";

type Stage = "select" | "form" | "loading" | "result";

const HUMAN_DISEASES = [
  { name: "Eczema", desc: "A chronic inflammatory skin condition causing itchy, red, and dry patches. Topical corticosteroids and moisturizers commonly help." },
  { name: "Psoriasis", desc: "An autoimmune condition forming silvery plaques. Often appears on elbows, knees and scalp." },
  { name: "Acne Vulgaris", desc: "Common condition involving blocked hair follicles. Topical retinoids and benzoyl peroxide are first-line." },
  { name: "Melanoma", desc: "A serious form of skin cancer arising from melanocytes. Seek dermatologist evaluation immediately." },
  { name: "Tinea (Ringworm)", desc: "Superficial fungal infection. Usually responds to topical antifungal therapy." },
];
const ANIMAL_DISEASES = [
  { name: "Canine Dermatitis", desc: "Inflammatory skin reaction often allergy-driven in dogs. Identify trigger and consult a vet." },
  { name: "Mange (Sarcoptic)", desc: "Highly contagious mite infestation causing intense itching and hair loss." },
  { name: "Hot Spot (Pyotraumatic)", desc: "Acute moist dermatitis. Clip, clean and treat with topical antimicrobial." },
  { name: "Ringworm (Animal)", desc: "Fungal infection causing circular bald patches. Zoonotic — handle carefully." },
  { name: "Flea Allergy Dermatitis", desc: "Hypersensitivity to flea saliva. Strict flea control resolves most cases." },
];

const fakePredict = (cat: "human" | "animal"): PredictionResult => {
  const pool = cat === "human" ? HUMAN_DISEASES : ANIMAL_DISEASES;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const top = shuffled[0];
  let remaining = 100;
  const probs = shuffled.map((d, i) => {
    if (i === shuffled.length - 1) return { name: d.name, value: remaining };
    const v = i === 0 ? 60 + Math.floor(Math.random() * 25) : Math.floor(Math.random() * (remaining * 0.6));
    remaining -= v;
    return { name: d.name, value: v };
  }).sort((a, b) => b.value - a.value);
  return { topClass: top.name, confidence: probs[0].value, description: top.desc, probabilities: probs };
};

const Predict = () => {
  const [stage, setStage] = useState<Stage>("select");
  const [category, setCategory] = useState<"human" | "animal">("human");
  const [payload, setPayload] = useState<PredictPayload | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

const handleSubmit = async (p: PredictPayload) => {
  setPayload(p);
  setStage("loading");

  try {
    const formData = new FormData();
    formData.append("file", p.image); 

    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.detail || "Failed to process image");
    }

    const data = await response.json();
    console.log("BACKEND RESULT:", data);

    setResult({
      topClass: data.prediction,
      confidence: data.confidence,
      description: p.category === "human" ? "Human skin condition detected." : "Animal skin condition detected.",
      probabilities: data.probabilities || [],
    });

    setStage("result");

  } catch (error: any) {
    console.error("ERROR:", error);
    alert(error.message || "Backend connection failed");
    setStage("form");
  }
};

  const reset = () => { setStage("select"); setPayload(null); setResult(null); };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 mx-auto max-w-5xl px-6">
        {stage === "select" && (
          <div className="animate-fade-in-up text-center">
            <div className="inline-block px-3 py-1 glass rounded-full text-xs font-medium mb-4">Step 1 of 3</div>
            <h1 className="text-4xl md:text-5xl font-bold">Who are we scanning?</h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Pick a category — the model and form adapt to species-specific symptoms.</p>
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <CategoryCard
                icon={<User className="w-10 h-10" />} title="Human" desc="Eczema, psoriasis, acne, melanoma and more."
                onClick={() => { setCategory("human"); setStage("form"); }}
              />
              <CategoryCard
                icon={<PawPrint className="w-10 h-10" />} title="Animal" desc="Dogs, cats and pets — dermatitis, mange, ringworm."
                onClick={() => { setCategory("animal"); setStage("form"); }}
              />
            </div>
          </div>
        )}

        {stage === "form" && (
          <div>
            <button onClick={reset} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="glass-strong rounded-3xl p-6 md:p-10 shadow-elegant">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-gradient-primary text-primary-foreground">
                  {category === "human" ? <User className="w-5 h-5" /> : <PawPrint className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{category === "human" ? "Human" : "Animal"} assessment</h2>
                  <p className="text-xs text-muted-foreground">Step 2 of 3 · Fill the form to begin analysis</p>
                </div>
              </div>
              <PredictionForm category={category} onSubmit={handleSubmit} />
            </div>
          </div>
        )}

        {stage === "loading" && <Loader />}

        {stage === "result" && payload && result && (
          <div>
            <button onClick={reset} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> New analysis
            </button>
            <ResultSection payload={payload} result={result} onReset={reset} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

const CategoryCard = ({ icon, title, desc, onClick }: { icon: React.ReactNode; title: string; desc: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group relative overflow-hidden glass rounded-3xl p-10 text-left transition-all hover:-translate-y-2 hover:shadow-elegant border border-white/10 hover:border-primary/50"
  >
    <div className="absolute -inset-1 bg-gradient-primary opacity-0 group-hover:opacity-30 blur-2xl transition-opacity" />
    <div className="relative">
      <div className="inline-flex p-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="mt-6 text-3xl font-display font-bold">{title}</h3>
      <p className="text-muted-foreground mt-2">{desc}</p>
      <div className="mt-6 text-sm font-semibold text-gradient">Choose →</div>
    </div>
  </button>
);

export default Predict;
