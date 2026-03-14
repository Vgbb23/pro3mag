import { X } from "lucide-react";

type TermsType = "compra" | "privacidade" | "frete";

interface TermsModalProps {
  open: boolean;
  type: TermsType | null;
  onClose: () => void;
}

const titles: Record<TermsType, string> = {
  compra: "Termos de Compra",
  privacidade: "Política de Privacidade",
  frete: "Política de Frete",
};

const TermsModal = ({ open, type, onClose }: TermsModalProps) => {
  if (!open || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl bg-card shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="border-b border-border px-5 py-4">
          <h3 className="text-sm font-bold text-foreground">{titles[type]}</h3>
        </div>
        <div className="px-5 py-4 space-y-3 text-xs text-muted-foreground overflow-y-auto max-h-[70vh]">
          {type === "compra" && (
            <>
              <p>
                Ao finalizar esta compra, você declara estar de acordo com as condições de pagamento,
                prazos de envio e política de trocas e devoluções informados nesta página.
              </p>
              <p>
                O pedido somente será processado após a confirmação do pagamento pela instituição financeira.
                Em caso de divergência de dados ou suspeita de fraude, o pedido poderá ser cancelado
                automaticamente.
              </p>
              <p>
                Você pode solicitar o <strong>cancelamento e reembolso</strong> da compra{" "}
                <strong>antes do pedido ser despachado</strong>. Nesses casos, o valor pago é devolvido integralmente,
                utilizando o mesmo meio de pagamento utilizado na compra.
              </p>
              <p>
                Se o pedido já tiver sido despachado e você não quiser mais a compra, é possível exercer o
                <strong> direito de arrependimento em até 7 dias corridos</strong> a partir da data em que o pedido
                chegar ao endereço informado, conforme o Código de Defesa do Consumidor.
              </p>
              <p>
                Nessa situação, o cancelamento e a devolução são <strong>gratuitos</strong>, mas será necessário
                <strong> aguardar o pedido chegar</strong> ao endereço informado para então realizar a postagem de
                devolução. O produto deve estar em perfeitas condições e com o{" "}
                <strong>lacre original intacto</strong>, sem sinais de uso ou violação.
              </p>
              <p>
                Para solicitar o cancelamento, entre em contato pelos nossos canais oficiais de suporte e informe
                o <strong>ID do pedido</strong>, que é enviado no recibo por e-mail:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  E-mail: <span className="font-medium text-foreground">suporte@encapsuladohoje.com</span>
                </li>
                <li>
                  Telefone/WhatsApp:{" "}
                  <span className="font-medium text-foreground">44 99988-8075</span>
                </li>
              </ul>
            </>
          )}
          {type === "privacidade" && (
            <>
              <p>
                Seus dados pessoais são utilizados exclusivamente para processar o pedido, emitir
                nota fiscal, realizar o envio e manter a comunicação sobre o status da compra.
              </p>
              <p>
                Não compartilhamos suas informações com terceiros, exceto parceiros logísticos e
                financeiros estritamente necessários para conclusão da transação.
              </p>
              <p>
                Todas as informações trafegam sob conexão segura (HTTPS) e são armazenadas com
                medidas de proteção compatíveis com as boas práticas de segurança da informação.
              </p>
            </>
          )}
          {type === "frete" && (
            <>
              <p>
                Os prazos exibidos na etapa de frete são estimativas fornecidas pelas transportadoras
                e contam a partir da confirmação do pagamento.
              </p>
              <p>
                O código de rastreamento é enviado por e-mail em até 24 horas úteis após a postagem
                do pedido. Acompanhe o andamento da entrega utilizando o link informado por e-mail.
              </p>
              <p>
                Eventuais atrasos decorrentes de greves, condições climáticas ou problemas na
                logística da transportadora podem impactar o prazo final de entrega.
              </p>
            </>
          )}
        </div>
        <div className="border-t border-border px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Ok, entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export type { TermsType };
export default TermsModal;

