import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Em quanto tempo vou sentir os resultados?", a: "A maioria dos clientes relata melhoras significativas no sono e energia em até 7 dias de uso contínuo. Para resultados completos, recomendamos o uso por pelo menos 30 dias." },
  { q: "Posso tomar com outros suplementos?", a: "Sim! O Pro3 Magnésio é seguro para combinar com outros suplementos. No entanto, consulte seu médico se estiver tomando medicamentos prescritos." },
  { q: "Tem garantia?", a: "Sim! Oferecemos garantia incondicional de 30 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro." },
  { q: "O frete é realmente grátis?", a: "Sim! Frete 100% grátis via Sedex para todo Brasil, com entrega em 2 a 5 dias úteis." },
];

const FAQSection = () => (
  <section className="pt-10 px-4 bg-background">
    <div className="container max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold text-center mb-8">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-4">
            <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
