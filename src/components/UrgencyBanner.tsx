import { AlertTriangle } from "lucide-react";

const UrgencyBanner = () => (
  <section className="py-10 px-4 bg-accent">
    <div className="container max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <AlertTriangle className="w-5 h-5 text-discount" />
        <span className="font-extrabold text-lg text-discount">ATENÇÃO: Estoque quase esgotado!</span>
      </div>
      <p className="text-sm text-foreground mb-1">
        Restam apenas <strong className="text-discount">20 unidades</strong> com preço promocional.
      </p>
      <p className="text-xs text-muted-foreground mb-4">Depois, volta ao preço original.</p>
      <button
        type="button"
        className="mt-5 inline-flex items-center text-lg justify-center rounded-md bg-primary p-5 px-7 font-bold text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
        onClick={() => {
          const el = document.getElementById("kits");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Garantir meu PRO3 Magnésio com Desconto
      </button>
    </div>
  </section>
);

export default UrgencyBanner;
