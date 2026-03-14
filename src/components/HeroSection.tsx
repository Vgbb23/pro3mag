import { useEffect, useRef, useState } from "react";
import { Star, ShoppingCart, Eye, Shield, Truck, Award, Flame, CheckCircle, ArrowRight, ArrowLeft, ThumbsUp, PersonStandingIcon, Users2Icon } from "lucide-react";
import heroVideo from "@/assets/carousel/Pro3 Magnésio AlwaysFit - L-Treonina + Dimalato + Quelato.mp4";
import imgPro3Frasco from "@/assets/carousel/pro3-1frasco-DoEkzZOt.webp";
import imgKit2Potes from "@/assets/carousel/kit-2-potes-DPseiwcU.png";
import imgMagnesioMelatonina from "@/assets/carousel/magnesio-melatonina-DtrkJs_N.jpeg";
import imgComoUsar from "@/assets/carousel/como-usar-CZ4uKBlf.png";
import { useSharedCountdown } from "@/hooks/useSharedCountdown";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [viewersCount, setViewersCount] = useState(158);
  const secondsLeft = useSharedCountdown();

  const carouselItems = [
    {
      type: "video" as const,
      src: heroVideo,
      alt: "Pro3 Magnésio AlwaysFit - Vídeo de apresentação",
    },
    {
      type: "image" as const,
      src: imgPro3Frasco,
      alt: "Pro3 Magnésio - 1 frasco",
    },
    {
      type: "image" as const,
      src: imgKit2Potes,
      alt: "Pro3 Magnésio - Kit com 2 potes",
    },
    {
      type: "image" as const,
      src: imgMagnesioMelatonina,
      alt: "Pro3 Magnésio com Melatonina",
    },
    {
      type: "image" as const,
      src: imgComoUsar,
      alt: "Como usar o Pro3 Magnésio",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    setVideoError(false);
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => setVideoError(true));
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const isVideoSlide = carouselItems[currentIndex].type === "video";
  useEffect(() => {
    if (isVideoSlide) setVideoError(false);
  }, [isVideoSlide]);

  useEffect(() => {
    if (carouselItems[currentIndex].type !== "image") {
      return;
    }

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  useEffect(() => {
    const deltas = [5, -2, 7, 2, -4, 3, -1];
    const minViewers = 120;
    const maxViewers = 260;

    const timeout = setTimeout(() => {
      const delta = deltas[Math.floor(Math.random() * deltas.length)];
      setViewersCount((prev) => {
        const next = prev + delta;
        if (next < minViewers) return minViewers;
        if (next > maxViewers) return maxViewers;
        return next;
      });
    }, 4000 + Math.random() * 8000); // entre 4s e 12s

    return () => clearTimeout(timeout);
  }, [viewersCount]);

  return (
    <section className="bg-card py-6 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Viewers */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="inline-flex items-center gap-2 bg-green-100 bg-opacity-50 border-green-200 text-green-500 text-sm  border font-medium px-3 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-urgency" />
            <Eye className="w-4 h-4" />
            <span>{viewersCount} vendo agora</span>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="flex justify-center mb-8 ">
          <div className="relative w-full max-w-md">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-background shadow-lg shadow-black/5 px-2 py-4">
              {carouselItems[currentIndex].type === "video" && !videoError ? (
                <button
                  type="button"
                  className="group relative block w-full focus:outline-none min-h-[200px] sm:min-h-[360px] overflow-hidden rounded-2xl bg-background"
                  onClick={toggleVideoPlayback}
                >
                  {/* Thumbnail sempre visível no mobile (poster nativo falha em vários devices) */}
                  <img
                    src={imgPro3Frasco}
                    alt=""
                    aria-hidden
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${
                      isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100 z-[1]"
                    }`}
                  />
                  <video
                    ref={videoRef}
                    className="relative h-[28vh] min-h-[200px] max-h-[280px] w-full object-contain sm:h-[360px] sm:min-h-[360px] sm:max-h-none"
                    playsInline
                    autoPlay
                    preload="metadata"
                    poster={imgPro3Frasco}
                    disablePictureInPicture
                    onError={() => setVideoError(true)}
                  >
                    <source src={carouselItems[currentIndex].src} type="video/mp4" />
                    <track kind="captions" srcLang="pt-BR" label="Português" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-opacity ${
                        isVideoPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                      }`}
                    >
                      {isVideoPlaying ? (
                        <span className="ml-px text-sm font-semibold">II</span>
                      ) : (
                        <span className="ml-0.5 text-lg font-semibold">&#9658;</span>
                      )}
                    </div>
                  </div>
                </button>
              ) : carouselItems[currentIndex].type === "video" && videoError ? (
                <button
                  type="button"
                  className="group relative block w-full focus:outline-none min-h-[200px] sm:min-h-[360px]"
                  onClick={() => setVideoError(false)}
                >
                  <img
                    src={imgPro3Frasco}
                    alt="Pro3 Magnésio - Vídeo indisponível"
                    className="h-[28vh] min-h-[200px] max-h-[280px] w-full object-contain sm:h-[360px] sm:min-h-[360px] sm:max-h-none"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl">
                    <span className="text-white text-sm font-medium px-3 py-1.5 bg-black/50 rounded-full">
                      Toque para tentar o vídeo
                    </span>
                  </div>
                </button>
              ) : (
                <img
                  src={carouselItems[currentIndex].src}
                  alt={carouselItems[currentIndex].alt}
                  className="h-[33vh] max-h-[280px] w-full object-contain transition-transform duration-500 sm:h-[360px] sm:max-h-none"
                />
              )}
            </div>

            {/* Controls */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute -left-5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background shadow-lg hover:bg-muted transition-colors"
            >
              <span className="sr-only">Imagem anterior</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute -right-5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background shadow-lg hover:bg-muted transition-colors"
            >
              <span className="sr-only">Próxima imagem</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="mt-4 flex justify-center gap-3">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 w-3 md:h-3.5 md:w-3.5 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-secondary ring-2 ring-secondary"
                      : "bg-blue-100 ring-1 ring-blue-300"
                  }`}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

       

        {/* Stock Warning */}
        <div className="justify-center rounded-lg  flex items-center gap-2 text-sm mb-4">
          <span className="text-lg">
            <ThumbsUp className="w-4 h-4 text-primary" />
          </span>
          <span>Restam apenas <strong className="text-discount">20 unidades</strong> em estoque!</span>
        </div>

         {/* Badge & Rating */}
         <div className="flex items-center justify-end mb-3">
         
        </div>

        {/* Title */}
        <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-extrabold text-foreground mb-1">Pro3 Magnésio</h1>
        <span className="border border-secondary text-secondary text-xs font-bold px-3 py-1 rounded-full">60 CAPS · 500MG</span>
        </div>

        <p className="text-gray-500 mb-4 text-sm">AlwaysFit · L-Treonina + Dimalato + Quelato</p>

        {/* Social Proof */}
        <div className="bg-accent rounded-lg p-2 flex items-center justify-between text-sm mb-5">
          <div className="flex items-center gap-2 text-success font-medium">
            <ShoppingCart className="w-4 h-4" />
            <span>+5.324 vendas</span>
          </div>
          <div className="flex items-center ">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-warning text-warning" />
            ))}
            <span className="text-sm text-muted-foreground ml-1">4.8 estrelas</span>
          </div>
        </div>

        {/* Price */}
        <div className="bg-card border border-border rounded-xl mb-5 p-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-foreground">R$ 39,99</span>
              <span className="text-md text-muted-foreground line-through">R$ 79,99</span>
            </div>
            <span className="relative -mt-12 bg-success text-success-foreground text-xs font-bold px-2.5 py-1 rounded-full">ECONOMIZE 50%</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-success font-medium">Preço mais baixo do ano</span>
            -
            <span className="text-discount font-medium animate-pulse-urgency"> Últimas unidades!</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            const el = document.getElementById("kits");
            if (el) el.scrollIntoView({ behavior: "smooth", });
          }}
          className="flex flex-col w-full  text-primary-foreground font-bold text-lg py-4 rounded-xl shadow-lg mb-3 bg-primary items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center justify-center gap-2">
          QUERO O MEU AGORA
          </div>
          <div>
            <p className="text-center text-sm text-white font-light">Frete Grátis + Bônus Exclusivos</p>
          </div>

        </button>
        

        {/* Buying Now */}
        <p className="text-center text-sm text-muted-foreground mb-6">
          <Users2Icon className="w-4 h-4 inline mr-1" />
          <strong className="text-foreground">14 pessoas</strong> estão finalizando a compra agora
        </p>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: Truck, label: "Frete Grátis", sub: "Todo Brasil" },
            { icon: Shield, label: "Compra Segura", sub: "Criptografia SSL" },
            { icon: Award, label: "Selo NPA", sub: "Qualidade Atestada" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="w-6 h-6 text-secondary" />
              <span className="text-xs font-semibold text-foreground">{label}</span>
              <span className="text-[10px] text-muted-foreground">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
