import { Sparkles, Github, Twitter, Mail } from "lucide-react";

const socials = [Github, Twitter, Mail];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">
                Derma<span className="text-gradient-primary">Sense</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              AI-powered preliminary skin analysis for everyone. Built with care
              by clinicians and engineers.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-lg bg-card border border-border grid place-items-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#home" className="hover:text-foreground">Home</a></li>
              <li><a href="#cta" className="hover:text-foreground">Predict</a></li>
              <li><a href="#how" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4">Resources</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
              <li><a href="#conditions" className="hover:text-foreground">Conditions</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> This
            platform is for preliminary informational use only and is not a
            replacement for licensed medical diagnosis. Always consult a
            qualified dermatologist for medical advice.
          </p>
          <p className="text-xs text-muted-foreground shrink-0">
            © {new Date().getFullYear()} DermaSense AI
          </p>
        </div>
      </div>
    </footer>
  );
}
