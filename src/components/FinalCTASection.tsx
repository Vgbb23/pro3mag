import { Flame } from "lucide-react";
import { useSharedCountdown } from "@/hooks/useSharedCountdown";

const FinalCTASection = () => {
  const secondsLeft = useSharedCountdown();

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <section className="py-10 px-4 bg-background">
      <div className="container max-w-2xl mx-auto text-center">
        <p className="text-sm font-semibold text-discount mb-2">ESSA OFERTA TERMINA EM:</p>
        <div className="mb-5 flex items-center justify-center gap-1 font-mono text-lg text-foreground">
          <span className="min-w-[2.4ch] rounded-md bg-card px-2 py-1 shadow-sm">{hours}</span>
          <span>:</span>
          <span className="min-w-[2.4ch] rounded-md bg-card px-2 py-1 shadow-sm">{minutes}</span>
          <span>:</span>
          <span className="min-w-[2.4ch] rounded-md bg-card px-2 py-1 shadow-sm">{seconds}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("kits");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center justify-center rounded-xl bg-primary p-5 px-7 text-lg font-bold text-primary-foreground shadow-lg hover:opacity-90 transition-opacity gap-2 mb-3"
        >
          NÃO QUERO PERDER ESSA OFERTA
        </button>
        <p className="text-xs text-muted-foreground">
          Pagamento 100% seguro · Seus dados estão protegidos
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;

