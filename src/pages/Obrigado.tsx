import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Package, Mail, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

const RECEIPT_STORAGE_KEY = "last_order_receipt";

type Receipt = {
  mainProduct: { title: string; subtitle: string; price: number; quantity: number; imageUrl: string };
  bumps: { name: string; price: number; imageUrl: string }[];
  shippingLabel: string;
  shippingCost: number;
  total: number;
  address: { cep: string; estado: string; cidade: string; rua: string; numero: string; complemento: string };
  email: string;
  orderId: string;
  trackingCode: string | null;
};

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatCep = (cep: string) => {
  const d = cep.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
};

const Obrigado = () => {
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECEIPT_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Receipt;
      if (parsed?.mainProduct && parsed?.total != null) setReceipt(parsed);
    } catch {
      // ignora
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-8 pb-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Obrigado pela sua compra!</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Seu pagamento foi confirmado. A compra será postada em até <strong>48 horas úteis</strong>.
            Você receberá uma confirmação e o código de rastreio em até <strong>24 horas úteis</strong> após a postagem.
          </p>
        </div>

        {receipt ? (
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-8">
            <div className="p-4 border-b border-border bg-muted/30">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Package className="w-4 h-4" />
                Recibo do pedido
              </h2>
              {receipt.orderId && (
                <p className="text-sm text-muted-foreground mt-1">
                  Pedido <strong className="text-foreground">{receipt.orderId}</strong>
                </p>
              )}
            </div>

            <div className="p-4 space-y-4">
              {/* Produto principal */}
              <div className="flex gap-4 items-start">
                <img
                  src={receipt.mainProduct.imageUrl}
                  alt={receipt.mainProduct.title}
                  className="h-20 w-20 rounded-xl object-contain bg-muted shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{receipt.mainProduct.title}</p>
                  <p className="text-xs text-muted-foreground">{receipt.mainProduct.subtitle}</p>
                  <p className="text-sm mt-1">
                    {receipt.mainProduct.quantity}x {formatCurrency(receipt.mainProduct.price)} ={" "}
                    <strong>{formatCurrency(receipt.mainProduct.price * receipt.mainProduct.quantity)}</strong>
                  </p>
                </div>
              </div>

              {/* Order bumps */}
              {receipt.bumps.length > 0 && (
                <>
                  <div className="h-px bg-border" />
                  {receipt.bumps.map((b) => (
                    <div key={b.name} className="flex gap-4 items-start">
                      <img
                        src={b.imageUrl}
                        alt={b.name}
                        className="h-16 w-16 rounded-lg object-contain bg-muted shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{b.name}</p>
                        <p className="text-sm text-muted-foreground">{formatCurrency(b.price)}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Frete */}
              <div className="h-px bg-border" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{receipt.shippingLabel}</span>
                <span className="font-medium text-foreground">
                  {receipt.shippingCost === 0 ? "Grátis" : formatCurrency(receipt.shippingCost)}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">{formatCurrency(receipt.total)}</span>
              </div>
            </div>

            {/* E-mail do recibo */}
            <div className="px-4 py-3 bg-muted/30 border-t border-border flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Recibo enviado para</p>
                <p className="font-medium text-foreground truncate">{receipt.email}</p>
              </div>
            </div>

            {/* Endereço de entrega */}
            <div className="px-4 py-3 border-t border-border flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="min-w-0 text-sm">
                <p className="text-xs text-muted-foreground mb-1">Endereço de entrega</p>
                <p className="text-foreground">
                  {receipt.address.rua}, {receipt.address.numero}
                  {receipt.address.complemento ? ` — ${receipt.address.complemento}` : ""}
                  <br />
                  {receipt.address.cidade} — {receipt.address.estado}
                  <br />
                  CEP {formatCep(receipt.address.cep)}
                </p>
              </div>
            </div>

            {/* Código de rastreio */}
            <div className="px-4 py-3 bg-muted/30 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Código de rastreio</p>
              <p className="font-medium text-foreground">
                {receipt.trackingCode || "Em breve — você receberá por e-mail em até 24h úteis após a postagem."}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Seu pagamento foi confirmado. Em breve você receberá um e-mail com os detalhes do pedido.
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Voltar ao início
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Obrigado;
