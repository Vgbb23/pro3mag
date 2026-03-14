import { Brain, Moon, Zap, Heart, Flame } from "lucide-react";

const benefits = [
  { icon: Brain, title: "Foco e Memória", desc: "L-Treonina atravessa a barreira cerebral, potencializando função cognitiva" },
  { icon: Moon, title: "Sono Reparador", desc: "Regula o ciclo do sono e reduz insônia — acorde renovado" },
  { icon: Zap, title: "Mais Energia", desc: "Combate cansaço e fadiga muscular com magnésio de alta absorção" },
  { icon: Heart, title: "Menos Estresse", desc: "Reduz ansiedade e tensão muscular, promovendo bem-estar geral" },
];

const BenefitsSection = () => (
  <section className="py-10 px-4 bg-card">
    <div className="container max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold text-center mb-2">Por que Pro3 Magnésio?</h2>
      <p className="text-center text-success font-medium text-sm mb-8">Resultados comprovados em até 7 dias</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {benefits.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-background rounded-xl p-4 border border-border text-center">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-sm mb-1 text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
      <button className="w-full bg-primary text-primary-foreground font-bold text-base py-4 rounded-xl shadow-lg hover:opacity-90 transition-opacity flex flex-col justify-center ">
        <div className="flex items-center justify-center gap-2">
          GARANTIR MINHA SAÚDE AGORA
        </div>

        <div>
        <p className="text-center text-sm text-white font-light mt-2">Apenas 20 unidades disponíveis com esse preço</p>
        </div>
      </button>
      
    </div>
  </section>
);

export default BenefitsSection;
