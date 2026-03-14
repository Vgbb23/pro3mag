import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Flame, AlertTriangle } from "lucide-react";

const StickyFooterCTA = () => {
  const location = useLocation();
  const [time, setTime] = useState({ h: 1, m: 54, s: 17 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  if (location.pathname !== "/") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="container max-w-2xl mx-auto">
        <button
          onClick={() => {
            const el = document.getElementById("kits");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full bg-primary text-primary-foreground font-bold text-base py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <Flame className="w-5 h-5" />
          COMPRAR AGORA
        </button>
        <div className="flex items-center justify-center mt-2 text-xs text-orange-600 animate-pulse">
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-discount" />
            <span>Últimas 20 unidades</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyFooterCTA;
