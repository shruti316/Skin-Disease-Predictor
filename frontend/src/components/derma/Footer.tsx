import { Activity, Github, Twitter, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/10 mt-24">
    <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-8">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">DermaScan AI</span>
        </div>
        <p className="text-muted-foreground text-sm max-w-md">
          Explainable AI for dermatology. Detect skin conditions in humans and animals
          with Grad-CAM heatmaps, confidence scoring, and detailed PDF reports.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm">Product</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Prediction</li><li>Reports</li><li>Heatmaps</li><li>Pricing</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm">Connect</h4>
        <div className="flex gap-3">
          {[Github, Twitter, Mail].map((Icon, i) => (
            <a key={i} className="p-2 rounded-lg glass hover:bg-white/10 transition-colors cursor-pointer">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
      © 2026 DermaScan AI · For research and educational use only · Not a substitute for medical diagnosis
    </div>
  </footer>
);

export default Footer;
