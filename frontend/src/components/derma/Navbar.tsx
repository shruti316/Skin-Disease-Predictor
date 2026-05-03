import { Link, useLocation } from "react-router-dom";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { pathname } = useLocation();
  const links = [
    { to: "/", label: "Home" },
    { to: "/predict", label: "Predict" },
    { to: "/#how", label: "How it works" },
    { to: "/#features", label: "Features" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <nav className="glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-card">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-primary p-2 rounded-lg">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Derma<span className="text-gradient">Scan</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all",
                  pathname === l.to && "text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/predict"
            className="bg-gradient-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-semibold shadow-glow hover:scale-105 transition-transform"
          >
            Start Prediction
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
