import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Truck, Lock, CreditCard, QrCode, Package, ChevronDown, Check, Plus, Minus, Tag, ShieldCheck, FileText, Clock, ArrowRight, CheckCircle, PersonStanding, User2, CopyCheck, Copy, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/components/Footer"; 
import imgVitaminaD from "@/assets/orderbumps/vitaminad.webp";
import imgOmega3 from "@/assets/orderbumps/omega3.jpg";
import imgColageno from "@/assets/orderbumps/colageno.webp";
import imgZinco from "@/assets/orderbumps/zinco.webp";
import TermsModal, { TermsType } from "@/components/TermsModal";
import imgKit1 from "@/assets/carousel/pro3-1frasco-DoEkzZOt.webp";
import imgKit2 from "@/assets/carousel/kit-2-potes-DPseiwcU.png";
import imgKit3 from "@/assets/carousel/magnesio-melatonina-DtrkJs_N.jpeg";

const FRUITFY_KIT_PRODUCT_IDS: Record<string, string | undefined> = {
  "1un": import.meta.env.VITE_FRUITFY_PRODUCT_MAGNESIO_1UN,
  "2un": import.meta.env.VITE_FRUITFY_PRODUCT_MAGNESIO_KIT2,
  combo: import.meta.env.VITE_FRUITFY_PRODUCT_MAGNESIO_KIT3,
};

const FRUITFY_BUMP_PRODUCT_IDS: Record<string, string | undefined> = {
  "vitamina-d": import.meta.env.VITE_FRUITFY_PRODUCT_VITAMINA_D3,
  omega3: import.meta.env.VITE_FRUITFY_PRODUCT_OMEGA3,
  colageno: import.meta.env.VITE_FRUITFY_PRODUCT_COLAGENO_VERISOL,
  zinco: import.meta.env.VITE_FRUITFY_PRODUCT_ZINCO_QUELATO,
};

const FRUITFY_EXPRESSO_PRODUCT_ID = import.meta.env.VITE_FRUITFY_PRODUCT_FRETE_EXPRESSO;

const FRUITFY_API_TOKEN = import.meta.env.VITE_FRUITFY_TOKEN;
const FRUITFY_STORE_ID = import.meta.env.VITE_FRUITFY_STORE_ID;

const KITS = [
  {
    id: "1un",
    title: "1 Pro3 Magnésio",
    subtitle: "L-treonina + Dimalato + Quelato",
    price: 39.99,
    oldPrice: 79.99,
    discount: "-50%",
    qty: 1,
  },
  {
    id: "2un",
    title: "Kit 2 Pro3 Magnésio",
    subtitle: "L-treonina + Dimalato + Quelato",
    price: 47.90,
    oldPrice: 119.98,
    discount: "-60%",
    qty: 1,
  },
  {
    id: "combo",
    title: "Kit 3 Pro3 Magnésio + Melatonina",
    subtitle: "L-treonina + Dimalato + Quelato + Melatonina Grátis",
    price: 69.90,
    oldPrice: 119.98,
    discount: "-42%",
    qty: 1,
  },
];

const ORDER_BUMPS = [
  {
    id: "vitamina-d",
    name: "Vitamina D3 2000UI",
    description: "Se sentindo cansado? Realize agora uma reposição de vitamina D3 e tenha mais disposição para o dia a dia.",
    price: 17.90,
    oldPrice: 39.90,
    image: imgVitaminaD,
  },
  {
    id: "omega3",
    name: "Ômega 3 EPA/DHA",
    description: "Proteja seu coração e cérebro e previna o infarto do miocárdio com Ômega 3 de alta concentração, aliado diário da circulação e foco.",
    price: 24.90,
    oldPrice: 49.90,
    image: imgOmega3,
  },
  {
    id: "colageno",
    name: "Colágeno Verisol",
    description: "Pele flácida e unhas quebradiças? Nunca mais! Leve a solução mais estudada do mercado para seu dia a dia.",
    price: 29.90,
    oldPrice: 59.90,
    image: imgColageno,
  },
  {
    id: "zinco",
    name: "Zinco Quelato 30mg",
    description: "Nunca mais fique gripado! Aumente sua defesa natural e equilíbrio hormonal com zinco de alta absorção, essencial para o dia a dia.",
    price: 14.90,
    oldPrice: 29.90,
    image: imgZinco,
  },
];

const SHIPPING_OPTIONS = [
  { id: "pac", label: "PAC — Econômico", time: "10 a 14 dias úteis", price: 0 },
  { id: "expresso", label: "Expresso — Sedex", time: "2 a 5 dias úteis", price: 14.90 },
];

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const EMAIL_DOMAINS = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com", "@icloud.com"];

const ESTADOS = [
  { uf: "AC", nome: "Acre" },
  { uf: "AL", nome: "Alagoas" },
  { uf: "AP", nome: "Amapá" },
  { uf: "AM", nome: "Amazonas" },
  { uf: "BA", nome: "Bahia" },
  { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" },
  { uf: "ES", nome: "Espírito Santo" },
  { uf: "GO", nome: "Goiás" },
  { uf: "MA", nome: "Maranhão" },
  { uf: "MT", nome: "Mato Grosso" },
  { uf: "MS", nome: "Mato Grosso do Sul" },
  { uf: "MG", nome: "Minas Gerais" },
  { uf: "PA", nome: "Pará" },
  { uf: "PB", nome: "Paraíba" },
  { uf: "PR", nome: "Paraná" },
  { uf: "PE", nome: "Pernambuco" },
  { uf: "PI", nome: "Piauí" },
  { uf: "RJ", nome: "Rio de Janeiro" },
  { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RS", nome: "Rio Grande do Sul" },
  { uf: "RO", nome: "Rondônia" },
  { uf: "RR", nome: "Roraima" },
  { uf: "SC", nome: "Santa Catarina" },
  { uf: "SP", nome: "São Paulo" },
  { uf: "SE", nome: "Sergipe" },
  { uf: "TO", nome: "Tocantins" },
];

const isValidCPF = (value: string) => {
  const cpf = value.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  const calcDigit = (factorStart: number) => {
    let sum = 0;
    for (let i = 0; i < factorStart - 1; i++) {
      sum += parseInt(cpf[i], 10) * (factorStart - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  const d1 = calcDigit(10);
  const d2 = calcDigit(11);

  return d1 === parseInt(cpf[9], 10) && d2 === parseInt(cpf[10], 10);
};

const STORAGE_KEY = "pro3_checkout_state_v1";

const Checkout = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const kitId = params.get("kit") || "1un";
  const selectedKit = KITS.find((k) => k.id === kitId) || KITS[0];

  const selectedKitImage =
    selectedKit.id === "1un"
      ? imgKit1
      : selectedKit.id === "2un"
      ? imgKit2
      : imgKit3;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [quantity, setQuantity] = useState(1);
  const [pixExpiresIn, setPixExpiresIn] = useState(60 * 60); // 1h para expirar PIX
  const [showPixCopiedModal, setShowPixCopiedModal] = useState(false);
  const [isCopyingPix, setIsCopyingPix] = useState(false);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState<string | null>(null);
  const [pixOrderId, setPixOrderId] = useState<string | null>(null);
  const [pixError, setPixError] = useState<string | null>(null);
  const [termsOpen, setTermsOpen] = useState(false);
  const [termsType, setTermsType] = useState<TermsType | null>(null);
  const [showCepModal, setShowCepModal] = useState(false);

  // Form state
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

  const [shipping, setShipping] = useState("pac");
  const [bumps, setBumps] = useState<string[]>([]);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const numeroInputRef = useRef<HTMLInputElement>(null);

  // CEP auto-fill
  useEffect(() => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        .then((r) => r.json())
        .then((data) => {
          if (!data.erro) {
            setEstado(data.uf || "");
            setCidade(data.localidade || "");
            setRua(data.logradouro || "");
            setTimeout(() => numeroInputRef.current?.focus(), 0);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingCep(false));
    }
  }, [cep]);

  // Masks
  const maskPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };
  const maskCpf = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  };
  const maskCep = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)}-${d.slice(5)}`;
  };

  const toggleBump = (id: string) =>
    setBumps((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));

  const selectAllBumps = () => {
    if (bumps.length === ORDER_BUMPS.length) setBumps([]);
    else setBumps(ORDER_BUMPS.map((b) => b.id));
  };

  const selectedShipping = SHIPPING_OPTIONS.find((s) => s.id === shipping);
  const shippingCost = selectedShipping?.price || 0;
  const bumpsSelected = ORDER_BUMPS.filter((b) => bumps.includes(b.id));
  const bumpsTotal = bumpsSelected.reduce((s, b) => s + b.price, 0);
  const bumpsOldTotal = bumpsSelected.reduce((s, b) => s + b.oldPrice, 0);
  const kitSubtotal = selectedKit.price * quantity;
  const kitOldSubtotal = selectedKit.oldPrice * quantity;
  const total = kitSubtotal + shippingCost + bumpsTotal;
  const oldTotal = kitOldSubtotal + shippingCost + bumpsOldTotal;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (step === 2 || step === 3) window.scrollTo(0, 0);
  }, [step]);

  // Carrega estado salvo (se houver) ao entrar no checkout
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<{
        nome: string;
        email: string;
        telefone: string;
        cpf: string;
        cep: string;
        estado: string;
        cidade: string;
        rua: string;
        numero: string;
        complemento: string;
        shipping: string;
        bumps: string[];
        quantity: number;
      }>;

      if (saved.nome) setNome(saved.nome);
      if (saved.email) setEmail(saved.email);
      if (saved.telefone) setTelefone(saved.telefone);
      if (saved.cpf) setCpf(saved.cpf);
      if (saved.cep) setCep(saved.cep);
      if (saved.estado) setEstado(saved.estado);
      if (saved.cidade) setCidade(saved.cidade);
      if (saved.rua) setRua(saved.rua);
      if (saved.numero) setNumero(saved.numero);
      if (saved.complemento) setComplemento(saved.complemento);
      if (saved.shipping && SHIPPING_OPTIONS.some((s) => s.id === saved.shipping)) {
        setShipping(saved.shipping);
      }
      if (Array.isArray(saved.bumps)) setBumps(saved.bumps);
      if (typeof saved.quantity === "number" && saved.quantity > 0) {
        setQuantity(saved.quantity);
      }
    } catch {
      // ignora erros de parse
    }
  }, []);

  // Salva automaticamente o estado do checkout no localStorage
  useEffect(() => {
    const payload = {
      nome,
      email,
      telefone,
      cpf,
      cep,
      estado,
      cidade,
      rua,
      numero,
      complemento,
      shipping,
      bumps,
      quantity,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // sem espaço ou modo privado: apenas ignora
    }
  }, [nome, email, telefone, cpf, cep, estado, cidade, rua, numero, complemento, shipping, bumps, quantity]);

  useEffect(() => {
    if (step !== 3) return;

    setPixError(null);
    window.scrollTo(0, 0);

    setPixExpiresIn(60 * 60);
    const timer = setInterval(() => {
      setPixExpiresIn((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  const handlesecondaryAction = async () => {
    if (step === 1) {
      const trimmedName = nome.trim();
      const nameParts = trimmedName.split(/\s+/).filter(Boolean);
      const phoneDigits = telefone.replace(/\D/g, "");

      if (nameParts.length < 2) {
        alert("Informe nome e sobrenome.");
        return;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Informe um e-mail válido (ex: email@dominio.com).");
        return;
      }

      if (!isValidCPF(cpf)) {
        setCpfError("CPF inválido. Verifique os números digitados.");
        alert("CPF inválido.");
        return;
      }

      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        alert("Informe um telefone válido com DDD (10 ou 11 dígitos).");
        return;
      }

      setStep(2);
    } else if (step === 2) {
      if (isCopyingPix) return;

      const cepDigits = cep.replace(/\D/g, "");
      if (cepDigits.length !== 8) {
        alert("Informe um CEP válido com 8 dígitos.");
        return;
      }
      if (!estado.trim()) {
        alert("Informe o estado.");
        return;
      }
      if (!cidade.trim()) {
        alert("Informe a cidade.");
        return;
      }
      if (!rua.trim()) {
        alert("Informe o endereço (rua, avenida, etc.).");
        return;
      }

      if (!FRUITFY_API_TOKEN || !FRUITFY_STORE_ID) {
        alert("Configuração de pagamento PIX indisponível. Fale com o suporte.");
        return;
      }

      const mainProductId = FRUITFY_KIT_PRODUCT_IDS[selectedKit.id];
      if (!mainProductId) {
        alert("Produto principal não está configurado para o PIX. Fale com o suporte.");
        return;
      }

      const phoneDigits = telefone.replace(/\D/g, "");
      const cpfDigits = cpf.replace(/\D/g, "");

      const items: { id: string; value: number; quantity: number }[] = [];

      // Kit principal
      items.push({
        id: mainProductId,
        value: Math.round(selectedKit.price * 100),
        quantity,
      });

      // Frete expresso como item separado
      if (shipping === "expresso") {
        if (!FRUITFY_EXPRESSO_PRODUCT_ID) {
          alert("Produto de frete expresso não está configurado para o PIX. Fale com o suporte.");
          return;
        }
        items.push({
          id: FRUITFY_EXPRESSO_PRODUCT_ID,
          value: Math.round(shippingCost * 100),
          quantity: 1,
        });
      }

      // Order bumps
      for (const bump of bumpsSelected) {
        const bumpProductId = FRUITFY_BUMP_PRODUCT_IDS[bump.id];
        if (!bumpProductId) {
          alert(`Produto adicional "${bump.name}" não está configurado para o PIX. Fale com o suporte.`);
          return;
        }
        items.push({
          id: bumpProductId,
          value: Math.round(bump.price * 100),
          quantity: 1,
        });
      }

      setIsCopyingPix(true);
      setPixError(null);

      try {
        const amount = items.reduce((sum, item) => sum + item.value * item.quantity, 0);

        console.log(items);

        const response = await fetch("https://api.fruitfy.io/api/pix/charge", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FRUITFY_API_TOKEN}`,
            "Store-Id": FRUITFY_STORE_ID,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            "name": nome,
            "email": email,
            "phone": phoneDigits,
            "cpf": cpfDigits,
            "items": items.map((item) => ({
              "id": item.id,
              "value": item.value,
            })),
          }),
        });

        const json = await response.json().catch(() => ({}));
        const success = json?.success ?? response.ok;
        const data = json?.data ?? json ?? {};
        const pix = data?.pix ?? data?.data?.pix ?? {};

        if (!success || !pix?.code) {
          console.error("Erro ao gerar PIX Fruitfy", json);
          setPixError(
            json?.message ||
              "Não foi possível gerar o PIX no momento. Tente novamente em alguns instantes."
          );
          alert("Não foi possível gerar o PIX no momento. Tente novamente em alguns instantes.");
          setIsCopyingPix(false);
          return;
        }

        setPixOrderId(data?.order_id ?? null);
        setPixCode(pix.code ?? null);
        setPixQrCodeBase64(pix.qr_code_base64 ?? null);
        setIsCopyingPix(false);
        setStep(3);
      } catch (error) {
        console.error("Erro inesperado ao gerar PIX Fruitfy", error);
        setPixError("Ocorreu um erro inesperado ao gerar o PIX. Tente novamente.");
        alert("Ocorreu um erro inesperado ao gerar o PIX. Tente novamente.");
        setIsCopyingPix(false);
      }
    }
  };

  const pixMinutes = String(Math.floor(pixExpiresIn / 60)).padStart(2, "0");
  const pixSeconds = String(pixExpiresIn % 60).padStart(2, "0");

  const emailLocalPart = email.split("@")[0] || "";
  const shouldShowEmailSuggestions = step !== 3 && emailLocalPart.length > 0 && !email.includes("@");
  const emailSuggestions = shouldShowEmailSuggestions
    ? EMAIL_DOMAINS.map((domain) => `${emailLocalPart}${domain}`)
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container max-w-2xl mx-auto flex items-center justify-between py-3 px-4">
          {step !== 3 && (
            <button
              onClick={() => navigate("/")}
              className={`flex items-center gap-1 text-sm transition-colors text-muted-foreground hover:text-foreground`}
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
      )}

      {step === 3 && showPixCopiedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-sm rounded-2xl bg-card p-5 shadow-xl">
            <button
              type="button"
              onClick={() => setShowPixCopiedModal(false)}
              className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mb-3 flex items-center gap-2">
              <CopyCheck className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-bold text-foreground">Código PIX copiado com sucesso!</h3>
            </div>
            <p className="text-md text-muted-foreground mb-3">
              Cole o código no app do seu banco para continuar com o pagamento.
            </p>
            <div className="mb-4 space-y-2 text-sm text-muted-foreground mt-5">
              <p>1. Abra o app do seu banco ou carteira digital.</p>
              <p>2. Vá até a opção de pagamento via PIX &quot;Copia e Cola&quot;.</p>
              <p>3. Cole o código copiado no campo indicado.</p>
              <p>4. Confirme os dados do destinatário e o valor.</p>
              <p>5. Finalize o pagamento e aguarde a confirmação automática aqui na página.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowPixCopiedModal(false)}
              className="mt-1 w-full rounded-xl bg-secondary py-2.5 text-sm font-semibold text-secondary-foreground hover:opacity-90 transition-opacity"
            >
              Ok, entendi!
            </button>
          </div>
        </div>
      )}
          {step !== 3 && (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Lock className="w-4 h-4 text-success" />
            Checkout Seguro
          </div>
          )}
          {step === 3 && (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <QrCode className="w-4 h-4 text-success" />
            Pagar com PIX
          </div>
          )}
          <div className="flex items-center gap-1 text-xs text-success font-medium">
            <Shield className="w-3.5 h-3.5" /> SSL Ativo
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 pb-8">
        {step === 3 && (
          <div className="text-center mb-5">
            <h1>{nome.split(" ")[0].toUpperCase()}, seu PIX foi gerado com sucesso!</h1>
            <h2 className="text-sm text-muted-foreground">Realize o pagamento para confirmar sua compra.</h2>
          </div>
        )}
            <div className="bg-card rounded-2xl border border-border p-4">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Seu Pedido</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                <img src={selectedKitImage} alt={selectedKit.title} className="h-14 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm">{selectedKit.title}</p>
                <p className="text-sm ">{selectedKit.subtitle}</p>
                <p className="text-[11px] text-success">
                  {shipping === "pac" ? "Frete Grátis" : selectedShipping?.label}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-foreground">{formatCurrency(kitSubtotal)}</p>
                <p className="text-xs text-muted-foreground line-through">
                  {formatCurrency(selectedKit.oldPrice * quantity)}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {quantity}x {formatCurrency(selectedKit.price)}
                </p>
              </div>
            </div>
            {step !== 3 && (
              <div className="mt-3 flex items-center justify-between">
              <span className="text-sm ">Quantidade</span>
              <div className="inline-flex items-center rounded-full border border-border bg-background">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="px-3 py-1 text-red-500 hover:text-red-600 disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-foreground">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-emerald-500 hover:text-emerald-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            )}
          </div>

          {/* Step indicator */}
          {step !== 3 && (
            <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground py-5">
            {[1, 2, 3].map((s, index) => {
              const isActive = step === s;
              const isDone = step > s;
              const Icon =
                s === 1 ? User2
                : s === 2 ? Truck
                : QrCode;

              return (
                <div key={s} className="flex items-center gap-3">
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 border ${
                      isActive
                        ? "border-secondary bg-secondary/10 text-secondary"
                        : isDone
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" />
                    )}
                    <span className="font-semibold">{s}</span>
                  </div>
                  {index < 2 && <div className="h-px w-6 bg-border" />}
                </div>
              );
            })}
          </div>
          )}

        {/* Step 1: Identificação */}
        {(step === 1) && (
          <section className="bg-card rounded-2xl border border-border p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-secondary font-bold text-sm">1</span>
              </div>
              <h2 className="font-bold text-foreground">Dados Pessoais</h2>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="nome" className="text-xs uppercase font-bold">Nome completo</Label>
                <Input id="nome" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 bg-white" />
              </div>
              <div>
                <Label htmlFor="cpf" className="text-xs uppercase font-bold">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => {
                    setCpfError(null);
                    setCpf(maskCpf(e.target.value));
                  }}
                  onBlur={() => {
                    if (cpf && !isValidCPF(cpf)) {
                      setCpfError("CPF inválido. Verifique os números digitados.");
                    }
                  }}
                  className="mt-1 bg-white"
                />
                {cpfError && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {cpfError}
                  </p>
                )}
              </div>
              <div className="relative">
                <Label htmlFor="email" className="text-xs uppercase font-bold">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  className="mt-1 bg-white"
                  autoComplete="email"
                />
                {emailSuggestions.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full rounded-xl border border-border bg-card shadow-lg overflow-hidden">
                    {emailSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setEmail(suggestion)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-accent transition-colors"
                      >
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
                <div>
                  <Label htmlFor="telefone" className="text-xs uppercase font-bold">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(maskPhone(e.target.value))} className="mt-1 bg-white" />
                </div>

            </div>
          </section>
        )}

        {/* Step 2: Endereço, frete e ofertas */}
        {step === 2 && (
          <>
            {/* Address */}
            <section className="bg-card rounded-2xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary font-bold text-sm">2</span>
                </div>
                <h2 className="font-bold text-foreground">Endereço de Entrega</h2>
                </div>
                <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="cep" className="text-xs uppercase font-bold">CEP</Label>
                    <div className="relative mt-1">
                      <Input id="cep" placeholder="00000-000" value={cep} onChange={(e) => setCep(maskCep(e.target.value))} />
                      {loadingCep && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                    <div className="mt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowCepModal(true)}
                        className="text-[10px] text-secondary hover:text-secondary/80 underline"
                      >
                        Não sei meu CEP
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="estado" className="text-xs uppercase font-bold">Estado</Label>
                    <select
                      id="estado"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="mt-1 flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-900 font-light ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecione</option>
                      {ESTADOS.map((e) => (
                        <option key={e.uf} value={e.uf}>
                          {e.uf} - {e.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="cidade" className="text-xs uppercase font-bold">Cidade</Label>
                  <Input id="cidade" placeholder="Sua cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} className="mt-1 bg-white" />
                </div>
                <div>
                  <Label htmlFor="rua" className="text-xs uppercase font-bold">Rua</Label>
                  <Input id="rua" placeholder="Nome da rua" value={rua} onChange={(e) => setRua(e.target.value)} className="mt-1 bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="numero" className="text-xs uppercase font-bold">Número</Label>
                    <Input ref={numeroInputRef} id="numero" placeholder="Nº" value={numero} onChange={(e) => setNumero(e.target.value)} className="mt-1 bg-white" />
                  </div>
                  <div>
                    <Label htmlFor="complemento" className="text-xs uppercase font-bold">Complemento</Label>
                    <Input id="complemento" placeholder="Apto, bloco..." value={complemento} onChange={(e) => setComplemento(e.target.value)} className="mt-1 bg-white" />
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-card rounded-2xl border border-border p-5 space-y-3 mt-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary font-bold text-sm">3</span>
                </div>
                <h2 className="font-bold text-foreground">Forma de Entrega</h2>
              </div>
              {SHIPPING_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    shipping === opt.id
                      ? "border-secondary bg-accent"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                  onClick={() => setShipping(opt.id)}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    shipping === opt.id ? "border-secondary" : "border-muted-foreground/40"
                  }`}>
                    {shipping === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                  </div>
                  {opt.id === "pac" ? <Package className={`w-4 h-4 shrink-0 ${shipping === opt.id ? "text-secondary" : "text-muted-foreground"}`} /> : <Truck className={`w-4 h-4 shrink-0 ${shipping === opt.id ? "text-secondary" : "text-muted-foreground"}`} />}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                    <p className="text-xs  flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {opt.time}
                    </p>
                  </div>
                  <span className={`font-bold text-sm ${opt.price === 0 ? "text-success" : "text-foreground"}`}>
                    {opt.price === 0 ? "GRÁTIS" : formatCurrency(opt.price)}
                  </span>
                </label>
              ))}
            </section>

            {/* Order Bumps */}
            <section className="bg-card rounded-2xl border-2 border-dashed border-secondary/40 p-5 space-y-4 my-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                  <Tag className="w-3.5 h-3.5 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground">Leve Junto — Ofertas Exclusivas</h2>
                  <p className="text-xs">Ofertas únicas válidas só nesta compra!</p>
                </div>
              </div>

              {/* Select all */}
              <button
                onClick={selectAllBumps}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                  bumps.length === ORDER_BUMPS.length
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-secondary/30 bg-accent text-secondary hover:bg-secondary/10"
                }`}
              >
                <Plus className="w-4 h-4" />
                {bumps.length === ORDER_BUMPS.length ? "✓ Todas as ofertas selecionadas" : "Pegar todas as ofertas"}
              </button>

              <div className="space-y-7">
                {ORDER_BUMPS.map((bump) => {
                  const selected = bumps.includes(bump.id);
                  return (
                    <div
                      key={bump.id}
                      onClick={() => toggleBump(bump.id)}
                      className={`relative flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        selected
                          ? "border-secondary bg-accent shadow-sm"
                          : "border-border hover:border-secondary/30"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBump(bump.id);
                        }}
                        className="absolute right-3 top-0 -mt-3 inline-flex items-center gap-1 rounded-full border border-secondary bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-secondary shadow-sm hover:bg-secondary hover:text-secondary-foreground z-10"
                      >
                        <span
                          className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border ${
                            selected ? "bg-secondary border-secondary" : "border-muted-foreground"
                          }`}
                        >
                          {selected && <Check className="w-2 h-2 text-secondary-foreground hover:text-primary" />}
                        </span>
                        Pegar oferta
                      </button>
                      <div className="w-12 h-12 rounded-lg border border-border bg-white flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={bump.image} alt={bump.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground">{bump.name}</p>
                        <p className="text-xs">{bump.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-black text-secondary">{formatCurrency(bump.price)}</p>
                        <p className="text-[10px] text-muted-foreground line-through">{formatCurrency(bump.oldPrice)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {step === 3 && (
          <section className="space-y-5 py-5">
            {/* PIX Copia e Cola */}
            <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CopyCheck className="w-5 h-5 text-secondary" />
                <h2 className="font-bold text-foreground text-lg">PIX Copia e Cola</h2>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Copie o código abaixo e cole no app do seu banco.
              </p>
              <div className="rounded-xl border border-border bg-muted/60 p-3">
                <input
                  readOnly
                  value={pixCode ?? ""}
                  className="w-full bg-transparent text-[10px] font-mono text-muted-foreground outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isCopyingPix || !pixCode) return;
                  const code = pixCode;
                  setIsCopyingPix(true);
                  void navigator.clipboard.writeText(code).then(() => {
                    setShowPixCopiedModal(true);
                    setTimeout(() => setIsCopyingPix(false), 900);
                  }).catch(() => {
                    setIsCopyingPix(false);
                  });
                }}
                className={`w-full rounded-xl bg-secondary p-5 text-xl font-medium text-secondary-foreground flex items-center justify-center gap-2 transition-all ${
                  isCopyingPix ? "scale-[1.02] shadow-lg" : "hover:opacity-90"
                }`}
                disabled={!pixCode}
              >
                <Copy className={`w-4 h-4 ${isCopyingPix ? "animate-bounce" : ""}`} />
                {isCopyingPix ? "Copiado!" : "Copiar Código PIX"}
              </button>
            </div>

            {/* QR Code */}
            <div className="hidden md:block bg-card rounded-2xl border border-border p-5 space-y-4 text-center">
              <p className="text-xs  font-medium text-muted-foreground mb-2">Ou escaneie o QR Code abaixo</p>
              <div className="mx-auto inline-flex rounded-2xl border border-border bg-white p-3">
                {pixQrCodeBase64 ? (
                  <img
                    src={`${pixQrCodeBase64}`}
                    alt="QR Code PIX"
                    className="h-52 w-52"
                  />
                ) : pixCode ? (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                      pixCode
                    )}`}
                    alt="QR Code PIX"
                    className="h-52 w-52"
                  />
                ) : (
                  <div className="h-52 w-52 flex items-center justify-center text-xs text-muted-foreground">
                    Não foi possível carregar o QR Code.
                  </div>
                )}
              </div>
              <div></div>
              <div className="mt-4 rounded-full bg-accent px-4 py-2 text-xs uppercase font-bold inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                <span>
                  Esse PIX expira em <span className="font-bold text-secondary">{pixMinutes}:{pixSeconds}</span>
                </span>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                O pagamento é confirmado automaticamente. Não feche esta página.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-center gap-2 bg-secondary/10 p-5 rounded-xl text-secondary">
                <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-secondary">Aguardando confirmação do pagamento...</p>
              </div>
            </div>
          </section>

        )}
        
        {/* Total Summary (apenas etapas 2 e 3) */}
        {step !== 1 && (
          <div>
            <section className="bg-card rounded-2xl border border-border p-5 space-y-3">
            <h2 className="font-bold text-foreground text-xs uppercase  tracking-wider">Resumo</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {selectedKit.title} (x{quantity})
                </span>
                <span className="text-foreground">{formatCurrency(kitSubtotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Desconto no kit</span>
                <span className="text-success font-medium">{selectedKit.discount}</span>
              </div>
              {ORDER_BUMPS.filter((b) => bumps.includes(b.id)).map((b) => (
                <div key={b.id} className="flex justify-between">
                  <span className="text-muted-foreground">{b.name}</span>
                  <span className="text-foreground">{formatCurrency(b.price)}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className={shippingCost === 0 ? "text-success font-medium" : "text-foreground"}>
                  {shippingCost === 0 ? "Grátis" : formatCurrency(shippingCost)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-foreground text-base">Total</span>
                <div className="text-right">
                  <p className="text-[11px] text-muted-foreground line-through">
                    {formatCurrency(oldTotal)}
                  </p>
                  <p className="font-black text-foreground text-xl">{formatCurrency(total)}</p>
                  
                </div>
              </div>
            </div>
          </section>

          {step === 3 && (
            <div className="py-5 px-3">
              <p className="text-[11px] text-muted-foreground text-left">
                Seu pedido será enviado para o endereço{" "}
                <span className="font-medium text-foreground">
                  {rua}, {numero}
                  {complemento ? `, ${complemento}` : ""} — {cidade}/{estado || "UF"} — CEP {cep || "não informado"}
                </span>{" "}
                e chegará no prazo de{" "}
                <span className="font-medium text-foreground">{selectedShipping.time}</span>.
              </p>

              <p className="text-[11px] text-muted-foreground text-left mt-4">
                Seu recibo e código de rastreamento serão enviados para o seu endereço de e-mail{" "}
                <span className="font-medium text-foreground">
                  {email}
                </span>.
                <br />
                <br />
                Os pedidos são despachados em até 48 horas úteis após o pagamento e o rastreamento é enviado em até 24 horas úteis após o envio.
              </p>
            </div>
          )}
          </div>
        )}

        {step !== 3 && (
          <>
            {/* CTA por etapa */}
            <button
              onClick={handlesecondaryAction}
              disabled={step === 2 && isCopyingPix}
              className={`w-full text-secondary-foreground font-bold text-lg py-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-opacity mt-3 ${
                step === 1 ? "bg-primary" : "bg-green-600"
              } ${isCopyingPix ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
            >
              {step === 1 ? (
                <>
                  Próximo: Endereço de Entrega
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-5 h-5 ${
                      isCopyingPix ? "animate-[wiggle_0.5s_ease-in-out_infinite]" : ""
                    }`}
                    style={
                      isCopyingPix
                        ? { animationName: "wiggle", animationDuration: "0.5s", animationIterationCount: "infinite" }
                        : undefined
                    }
                  />
                  <span>
                    {isCopyingPix ? "Gerando PIX e confirmando pedido..." : `Gerar PIX — ${formatCurrency(total)}`}
                  </span>
                </div>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-thin mt-2 pb-5">
              <Lock className="w-3.5 h-3.5 " />
              Seus dados estão 100% protegidos com criptografia SSL
            </div>
          </>
        )}

            {/* Footer */}
            {step >= 2 && (
              <footer className="border-t border-border mt-2 space-y-4 pt-14">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: ShieldCheck, label: "Compra Garantida", sub: "7 dias" },
                    { icon: Truck, label: "Frete Seguro", sub: "Rastreamento incluso" },
                    { icon: Lock, label: "Pagamento Seguro", sub: "Criptografia SSL" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <Icon className="w-5 h-5 text-success" />
                      <span className="text-[10px] font-semibold text-foreground">{label}</span>
                      <span className="text-[9px] text-muted-foreground">{sub}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => { setTermsType("compra"); setTermsOpen(true); }}
                    className="hover:text-foreground underline transition-colors"
                  >
                    Termos de Compra
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => { setTermsType("privacidade"); setTermsOpen(true); }}
                    className="hover:text-foreground underline transition-colors"
                  >
                    Política de Privacidade
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => { setTermsType("frete"); setTermsOpen(true); }}
                    className="hover:text-foreground underline transition-colors"
                  >
                    Política de Frete
                  </button>
                </div>
              </footer>
            )}


      </main>

      <div className="pt-14">
        <Footer />
      </div>

      <TermsModal
        open={termsOpen}
        type={termsType}
        onClose={() => {
          setTermsOpen(false);
          setTermsType(null);
        }}
      />

      {showCepModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-card shadow-xl flex flex-col">
            <button
              type="button"
              onClick={() => setShowCepModal(false)}
              className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-sm font-bold text-foreground">Consultar CEP</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Use a ferramenta oficial dos Correios para encontrar seu CEP pelo nome da sua rua.
              </p>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                title="Consulta CEP Correios"
                src="https://buscacepinter.correios.com.br/app/endereco/index.php"
                className="w-full h-full border-0"
                style={{ height: "100vh", width: "95vw" }}
              />
            </div>
            <div className="border-t border-border px-5 py-3">
              <button
                type="button"
                onClick={() => setShowCepModal(false)}
                className="w-full rounded-xl bg-secondary py-2.5 text-xs font-semibold text-secondary-foreground hover:opacity-90 transition-opacity"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
