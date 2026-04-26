import { useCallback, useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onFile: (file: File, dataUrl: string) => void;
  onClear: () => void;
  preview: string | null;
}

export const ImageUploader = ({ onFile, onClear, preview }: Props) => {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => onFile(file, e.target?.result as string);
      reader.readAsDataURL(file);
    },
    [onFile]
  );

  if (preview) {
    return (
      <div className="relative group rounded-2xl overflow-hidden glass-card">
        <img src={preview} alt="Upload preview" className="w-full h-auto" />
        <button
          onClick={onClear}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) handleFile(f);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300",
        drag
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border glass-card hover:border-primary/50 hover:bg-primary/5"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-elegant mb-4 animate-float">
        <Upload className="w-7 h-7" />
      </div>
      <h3 className="font-display font-semibold text-lg mb-1">
        Drop your skin image here
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        or click to browse — JPG, PNG up to 10MB
      </p>
      <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <ImageIcon className="w-3.5 h-3.5" />
        Use a clear, well-lit close-up for best results
      </div>
    </div>
  );
};
