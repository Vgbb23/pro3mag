import { useEffect, useState } from "react";
import { Star, CheckCircle, PictureInPicture, Camera, XCircle, X } from "lucide-react";
import avatarCarlos from "@/assets/reviews/avatar-carlos-viVsfAEK.jpg";
import avatarPatricia from "@/assets/reviews/avatar-patricia-B7FNIuWZ.jpg";
import avatarRoberto from "@/assets/reviews/avatar-roberto-BQOV2PKm.jpg";
import avatarJuliana from "@/assets/reviews/avatar-juliana-D9dGRD-2.jpg";
import reviewCarlos from "@/assets/reviews/review-carlos-DYpZLTTI.webp";
import reviewPatricia from "@/assets/reviews/review-patricia-C5eaJEZ3.webp";
import reviewRoberto from "@/assets/reviews/review-roberto-ye4fR_p6.webp";
import reviewJuliana from "@/assets/reviews/review-juliana-J-ohcoB8.webp";

const testimonials = [
  {
    name: "Carlos M.",
    loc: "São Paulo, SP",
    time: "3 dias atrás",
    text: "Comecei a tomar há 2 semanas e a diferença no sono é absurda. Acordo muito mais disposto e minha concentração no trabalho melhorou demais!",
    avatar: avatarCarlos,
    photo: reviewCarlos,
  },
  {
    name: "Patrícia R.",
    loc: "Curitiba, PR",
    time: "1 semana atrás",
    text: "Sofria com câimbras e dores musculares. Com o Pro3 Magnésio, praticamente acabaram. Recomendo de olhos fechados!",
    avatar: avatarPatricia,
    photo: reviewPatricia,
  },
  {
    name: "Roberto S.",
    loc: "Belo Horizonte, MG",
    time: "2 semanas atrás",
    text: "O melhor magnésio que já tomei. Senti a diferença na ansiedade e no foco. O combo com melatonina é sensacional, durmo muito melhor.",
    avatar: avatarRoberto,
    photo: reviewRoberto,
  },
  {
    name: "Juliana F.",
    loc: "Florianópolis, SC",
    time: "5 dias atrás",
    text: "Eu era cética, mas depois de 1 semana já senti meu sono melhorar drasticamente. Não vivo mais sem! Comprei o kit de 6 pra toda família.",
    avatar: avatarJuliana,
    photo: reviewJuliana,
  },
];

const TestimonialsSection = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (previewImage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [previewImage]);

  return (
    <section className="py-10 px-4 bg-background">
      <div className="container max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-center mb-2">O que dizem nossos clientes</h2>
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-3xl font-black text-foreground">4.9/5</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-warning text-warning" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">5.324+ clientes</span>
        </div>
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={t.avatar}
                  alt={`Foto de perfil de ${t.name}`}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-foreground">{t.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-success" />
                    <span className="text-xs text-success font-medium">Verificada</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {t.loc} · {t.time}
                  </span>
                </div>
              </div>
              <div className="flex gap-0.5 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-3">"{t.text}"</p>
              <button
                type="button"
                className="w-full overflow-hidden rounded-lg border border-border bg-background/60"
                onClick={() => setPreviewImage(t.photo)}
              >
                <div className="relative h-40 w-full">
                  <span className="flex gap-1 items-center absolute left-2 top-2 z-10 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px]  text-xs tracking-wide text-white">
                    <Camera className="w-3.5 h-3.5" />
                    Foto do cliente
                  </span>
                  <img
                    src={t.photo}
                    alt={`Foto do produto enviada por ${t.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-4 -right-3 rounded-full bg-white text-black h-9 w-9 flex items-center justify-center text-xl font-bold shadow-lg"
              aria-label="Fechar visualização"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Visualização da imagem do cliente"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
