import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export type PredictPayload = {
  category: "human" | "animal";
  name?: string;
  age?: number;
  gender?: string;
  animalType?: string;
  symptoms: string;
  imageUrl?: string;
  image: File; // 🔥 ADD THIS
};

const HUMAN_SYMPTOMS = ["Itching", "Redness", "Scaling", "Blisters", "Dryness", "Swelling", "Pain", "Discoloration"];
const ANIMAL_SYMPTOMS = ["Hair loss", "Scratching", "Crusts", "Lesions", "Redness", "Bad odor", "Swelling", "Discharge"];

const PredictionForm = ({ category, onSubmit }: { category: "human" | "animal"; onSubmit: (p: PredictPayload) => void }) => {
  const isHuman = category === "human";
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [animalType, setAnimalType] = useState("dog");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [extra, setExtra] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File | null) => {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.error("Please upload an image file.");
    return;
  }

  setImage(file); // ✅ IMPORTANT FIX
  setImageUrl(URL.createObjectURL(file));
};

  const toggleSymptom = (s: string) =>
    setSymptoms((arr) => (arr.includes(s) ? arr.filter((x) => x !== s) : [...arr, s]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image first.");
      return;
    }
    if (!age) {
      toast.error("Age is required.");
      return;
    }

    onSubmit({
      category,
      name: name || undefined,
      age: Number(age) || undefined,
      gender: isHuman ? gender : undefined,
      animalType: !isHuman ? animalType : undefined,
      symptoms: [...symptoms, extra].filter(Boolean).join(", "),
      imageUrl,
      image, // 🔥 THIS FIXES EVERYTHING
    });
  };

  const chips = isHuman ? HUMAN_SYMPTOMS : ANIMAL_SYMPTOMS;

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
      {/* left: image */}
      <div>
        <label className="text-sm font-medium mb-2 block">Upload image</label>
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
          onClick={() => fileRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all aspect-square flex items-center justify-center overflow-hidden glass ${
            drag ? "border-primary bg-primary/10" : "border-white/15 hover:border-primary/60"
          }`}
        >
          {imageUrl ? (
            <>
              <img src={imageUrl} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setImageUrl(""); }}
                className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="text-center p-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <Upload className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="font-semibold">Drop image here</p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse · PNG, JPG up to 10MB</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </div>
        <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>For best results, use a clear, well-lit close-up of the affected area.</span>
        </div>
      </div>

      {/* right: fields */}
      <div className="space-y-4">
        {isHuman ? (
          <>
            <Field label="Name (optional)">
              <input value={name} onChange={(e) => setName(e.target.value)} className={input} placeholder="Jane Doe" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Age">
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className={input} placeholder="32" />
              </Field>
              <Field label="Gender">
                <select value={gender} onChange={(e) => setGender(e.target.value)} className={input}>
                  <option value="">Select</option>
                  <option>Female</option><option>Male</option><option>Other</option>
                </select>
              </Field>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Animal type">
              <select value={animalType} onChange={(e) => setAnimalType(e.target.value)} className={input}>
                <option value="dog">Dog</option><option value="cat">Cat</option>
                <option value="horse">Horse</option><option value="rabbit">Rabbit</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label="Age (years)">
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className={input} placeholder="3" />
            </Field>
          </div>
        )}

        <Field label="Symptoms">
          <div className="flex flex-wrap gap-2 mb-2">
            {chips.map((c) => {
              const on = symptoms.includes(c);
              return (
                <button
                  type="button" key={c} onClick={() => toggleSymptom(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    on ? "bg-gradient-primary text-primary-foreground shadow-glow" : "glass hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <textarea
            value={extra} onChange={(e) => setExtra(e.target.value)}
            placeholder="Additional symptoms or notes…"
            rows={3}
            className={`${input} resize-none`}
          />
        </Field>

        <button
          type="submit"
          className="w-full bg-gradient-primary text-primary-foreground py-4 rounded-2xl font-semibold shadow-glow hover:shadow-elegant hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Analyze with AI
        </button>
      </div>
    </form>
  );
};

const input =
  "w-full bg-input/60 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-sm font-medium mb-1.5 block">{label}</label>
    {children}
  </div>
);

export default PredictionForm;
