import { Moon, Battery, Zap, Brain, HeartPulse, CheckCircle, XCircle } from "lucide-react";

const problems = [
  { icon: XCircle, text: "Dificuldade para dormir e insônia crônica" },
  { icon: XCircle, text: "Cansaço constante mesmo dormindo bem" },
  { icon: XCircle, text: "Câimbras, dores musculares e tensão" },
  { icon: XCircle, text: "Ansiedade, irritabilidade e falta de foco" },
  { icon: XCircle, text: "Envelhecimento precoce e imunidade baixa" },
];

const ProblemsSection = () => (
  <section className="py-10 px-4 bg-background">
    <div className="container max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold text-center mb-6">
        Você sabia que <span className="text-discount">80% dos brasileiros</span> têm deficiência de magnésio?
      </h2>
      <div className="space-y-3 mb-6">
        {problems.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 bg-card rounded-lg p-3 border border-border">
            <Icon className="w-5 h-5 text-discount flex-shrink-0" />
            <span className="text-sm text-foreground">{text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 text-success font-bold text-lg">
        <CheckCircle className="w-5 h-5" />
        Pro3 Magnésio resolve TODOS esses problemas ✓
      </div>
    </div>
  </section>
);

export default ProblemsSection;
