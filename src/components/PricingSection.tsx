import { useLocation, useNavigate } from "react-router-dom";
import { Truck, Zap, Flame, Gift, Star } from "lucide-react";
import imgKit1 from "@/assets/carousel/pro3-1frasco-DoEkzZOt.webp";
import imgKit2 from "@/assets/carousel/kit-2-potes-DPseiwcU.png";
import imgKit3 from "@/assets/carousel/magnesio-melatonina-DtrkJs_N.jpeg";

const kits = [
  {
    badge: "MAIS VENDIDO",
    badgeColor: "bg-primary",
    title: "1 Pro3 Magnésio",
    subtitle: "L-treonina + Dimalato + Quelato",
    price: "R$ 39,99",
    oldPrice: "R$ 79,99",
    discount: "-50% OFF",
    highlight: false,
    extra: null,
    image: imgKit1,
  },
  {
    badge: "MELHOR CUSTO-BENEFÍCIO",
    badgeColor: "bg-success h-10",
    title: "Kit 2 Pro3 Magnésio",
    subtitle: "L-treonina + Dimalato + Quelato",
    price: "R$ 47,90",
    oldPrice: "R$ 119,98",
    discount: "-60% OFF",
    perUnit: "(R$ 23,95/un)",
    highlight: true,
    extra: null,
    image: imgKit2,
  },
  {
    badge: "BRINDE EXCLUSIVO",
    badgeColor: "bg-primary",
    title: "Kit 3 Pro3 Magnésio + Melatonina",
    subtitle: "L-treonina + Dimalato + Quelato + Melatonina Grátis",
    price: "R$ 69,90",
    oldPrice: "R$ 119,98",
    discount: "-42% OFF",
    perUnit: "(R$ 23,95/un)",
    highlight: false,
    extra: "Melatonina Grátis",
    image: imgKit3,
  },
];

const PricingSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const kitIds = ["1un", "2un", "combo"];
  return (
    <section className="py-10 px-4 bg-card" id="kits">
      <div className="container max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-center mb-2">Escolha seu Kit Ideal</h2>
        <p className="text-center text-sm text-muted-foreground mb-8">Quanto mais frascos, <strong>maior a economia</strong></p>
        <div className="space-y-5">
          {kits.map((kit, index) => (
            <div key={kit.title} className={`rounded-2xl border-2 overflow-hidden ${kit.highlight ? "border-success shadow-lg" : "border-border"}`}>
              <div className={`${kit.badgeColor} flex items-center justify-center gap-1 text-primary-foreground text-xs font-bold text-center py-1.5`}>
                {kit.highlight && "RECOMENDADO - "}
                {kit.badge}
              </div>
              <div className="p-5 bg-card">
                {kit.image && (
                  <div className="mb-3 flex justify-center">
                    <img
                      src={kit.image}
                      alt={kit.title}
                      className="h-24 w-auto object-contain drop-shadow-md"
                    />
                  </div>
                )}
                <h3 className="font-bold text-lg text-foreground mb-1">{kit.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{kit.subtitle}</p>
                {kit.extra && (
                  <div className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full mb-3">
                    <Gift className="w-3 h-3" /> {kit.extra}
                  </div>
                )}
                <div className="relative mt-3 mb-4 rounded-xl bg-muted/40 px-4 py-3 flex items-center justify-between gap-4">
                  <span className="absolute -top-2 right-2 bg-success text-success-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {kit.discount}
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-foreground">{kit.price}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="line-through">{kit.oldPrice}</span>
                      {kit.perUnit && <span className="text-success font-medium">{kit.perUnit}</span>}
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="flex items-center justify-end gap-1 text-success font-semibold">
                      <Truck className="w-3.5 h-3.5" /> Frete Grátis
                    </div>
                    <div className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                      <Zap className="w-3.5 h-3.5 text-success" /> Entrega Full
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const nextParams = new URLSearchParams(location.search);
                    nextParams.set("kit", kitIds[index]);
                    navigate({
                      pathname: "/checkout",
                      search: `?${nextParams.toString()}`,
                    });
                  }}
                  className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  COMPRAR AGORA
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">Pagamento 100% seguro · Seus dados protegidos</p>
      </div>
    </section>
  );
};

export default PricingSection;
