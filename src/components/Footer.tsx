import logoAlwaysFit from "@/assets/reviews/logo-alwaysfit-CzaQ0MHC.webp";
import { ShieldCheck, Lock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05070d] text-muted-foreground pt-8 pb-6 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-2 mb-6">
          <img
            src={logoAlwaysFit}
            alt="AlwaysFit"
            className="h-8 w-auto object-contain"
            style={{ filter: "invert(1)" }}
          />
          <p className="text-xs text-center text-muted-foreground max-w-xs">
            Suplementos de alta qualidade para sua saúde e bem-estar.
          </p>
        </div>

        <div className="h-px w-full bg-white/10 mb-4" />

        <div className="flex flex-col items-center gap-2 mb-4 text-[11px] text-center">
          <span>CNPJ 30.417.094/0001-60</span>
          <span>© 2018 - {currentYear} - AlwaysFit -Todos os direitos reservados.</span>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 text-[11px] text-white/70">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Compra 100% segura</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-white/70" />
            <span>Dados protegidos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

