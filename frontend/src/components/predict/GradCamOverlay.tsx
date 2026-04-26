import { useEffect, useRef } from "react";

interface Props {
  imageUrl: string;
  intensity?: number; // 0..1 visibility of heatmap
  hotspots?: Array<{ x: number; y: number; r: number; strength: number }>;
}

/**
 * Grad-CAM style heatmap overlay rendered onto a canvas.
 * Uses radial gradients with a thermal color ramp (blue → cyan → green → yellow → red)
 * to simulate model attention regions over the uploaded image.
 */
export const GradCamOverlay = ({ imageUrl, intensity = 0.65, hotspots }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const draw = () => {
      const w = img.clientWidth;
      const h = img.clientHeight;
      if (!w || !h) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Generate hotspots if not provided (deterministic feel)
      const spots =
        hotspots && hotspots.length
          ? hotspots
          : [
              { x: 0.5, y: 0.5, r: 0.35, strength: 1.0 },
              { x: 0.62, y: 0.42, r: 0.18, strength: 0.7 },
              { x: 0.38, y: 0.6, r: 0.14, strength: 0.55 },
            ];

      // Layered radial gradients for thermal effect
      ctx.globalAlpha = intensity;
      spots.forEach((s) => {
        const cx = s.x * w;
        const cy = s.y * h;
        const radius = s.r * Math.min(w, h);

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        // Hot core → cool fade
        g.addColorStop(0, `rgba(255, 0, 0, ${0.85 * s.strength})`);
        g.addColorStop(0.2, `rgba(255, 120, 0, ${0.7 * s.strength})`);
        g.addColorStop(0.4, `rgba(255, 220, 30, ${0.55 * s.strength})`);
        g.addColorStop(0.65, `rgba(60, 220, 130, ${0.35 * s.strength})`);
        g.addColorStop(0.85, `rgba(40, 160, 230, ${0.2 * s.strength})`);
        g.addColorStop(1, `rgba(20, 30, 120, 0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    if (img.complete) draw();
    else img.onload = draw;
    const ro = new ResizeObserver(draw);
    ro.observe(img);
    return () => ro.disconnect();
  }, [imageUrl, intensity, hotspots]);

  return (
    <div className="relative w-full">
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Analyzed skin"
        className="w-full h-auto rounded-2xl block"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none rounded-2xl mix-blend-screen"
        style={{ filter: "blur(8px)" }}
      />
      {/* Scanning grid overlay for tech feel */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-[linear-gradient(0deg,transparent_98%,rgba(255,255,255,0.15)_100%),linear-gradient(90deg,transparent_98%,rgba(255,255,255,0.15)_100%)] bg-[length:24px_24px]" />
    </div>
  );
};
