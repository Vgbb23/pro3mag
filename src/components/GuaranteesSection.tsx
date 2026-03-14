import { Shield, Truck, RotateCcw, Award, CheckCircle } from "lucide-react";

const guarantees = [
  { icon: Shield, title: "Compra 100% Segura", desc: "Seus dados protegidos com criptografia de ponta" },
  { icon: Truck, title: "Frete Grátis via Sedex", desc: "Entrega em 2 a 5 dias úteis para todo Brasil" },
  { icon: CheckCircle, title: "Garantia de 30 dias", desc: "Satisfação garantida ou dinheiro de volta" },
  { icon: Award, title: "Selo NPA de Qualidade", desc: "Quelato autêntico de máxima absorção" },
];

const GuaranteesSection = () => (
  <section className="py-14 px-4 bg-card">
    <div className="container max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold text-center mb-8">Garantias AlwaysFit</h2>
      <div className="grid grid-cols-2 gap-4">
        {guarantees.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl p-4 border border-border text-center">
            <div className="w-12 h-12  rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-bold text-sm text-foreground mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GuaranteesSection;
