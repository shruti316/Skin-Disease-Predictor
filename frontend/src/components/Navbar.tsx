import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/#how", label: "How It Works" },
  { to: "/#conditions", label: "Conditions" },
  { to: "/#features", label: "Features" },
  { to: "/#about", label: "Why Us" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300",
            scrolled ? "glass shadow-soft" : "bg-transparent"
          )}
        >
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span>Derma<span className="gradient-text">Sense</span></span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group",
                    location.pathname === l.to && "text-foreground"
                  )}
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild variant="hero" size="sm" className="rounded-full px-5 hidden sm:inline-flex">
              <Link to="/predict">Start Prediction</Link>
            </Button>
            <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden glass mt-2 rounded-2xl p-4 animate-fade-in">
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <Button asChild variant="hero" size="sm" className="mt-2">
                <Link to="/predict" onClick={() => setOpen(false)}>Start Prediction</Link>
              </Button>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
