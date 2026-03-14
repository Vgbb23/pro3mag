const ingredients = [
  { num: "01", name: "L-Treonina", dose: "150mg", desc: "Atravessa a barreira cerebral — foco, memória e neuroproteção", color: "bg-primary" },
  { num: "02", name: "Dimalato", dose: "200mg", desc: "Combate fadiga e dores musculares — energia celular", color: "bg-secondary" },
  { num: "03", name: "Quelato", dose: "200mg", desc: "Máxima absorção — selo NPA garante qualidade superior", color: "bg-success" },
];

const TripleActionSection = () => (
  <section className="py-10 px-4 bg-background">
    <div className="container max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold text-center mb-2">Tripla Ação Magnésio</h2>
      <p className="text-center text-sm text-muted-foreground mb-8">3 formas de magnésio de alta absorção em 1 cápsula</p>
      <div className="space-y-4">
        {ingredients.map(({ num, name, dose, desc, color }) => (
          <div key={num} className="bg-card rounded-xl p-5 border border-border flex items-start gap-4">
            <div className={`${color} text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}>
              {num}
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="font-bold text-foreground">{name}</h3>
                <span className="text-sm text-primary font-semibold">{dose}</span>
              </div>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TripleActionSection;
