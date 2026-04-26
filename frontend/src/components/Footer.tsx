import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-muted/30 mt-20">
      <div className="container py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              Derma<span className="gradient-text">Sense</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              AI-powered preliminary skin condition analysis with explainable
              visual insights, built for awareness, not diagnosis.
            </p>
            <div className="flex gap-3 mt-5">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/predict" className="hover:text-foreground">Predict</Link></li>
              <li><Link to="/#features" className="hover:text-foreground">Features</Link></li>
              <li><Link to="/#about" className="hover:text-foreground">About</Link></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Disclaimer</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This platform is for preliminary informational use only and not a
              replacement for licensed medical diagnosis. Always consult a
              qualified dermatologist.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DermaSense. All rights reserved.</p>
          <p>Built with care for healthier skin.</p>
        </div>
      </div>
    </footer>
  );
};
