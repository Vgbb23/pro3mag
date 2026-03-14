import { Truck, Flame } from "lucide-react";
import { useSharedCountdown } from "@/hooks/useSharedCountdown";

const TopBanner = () => {
  const secondsLeft = useSharedCountdown();
  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="bg-banner text-banner-foreground py-2.5 px-4 flex items-center justify-between text-sm font-semibold sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4" />
        <span>FRETE GRÁTIS</span>
      </div>
      <div className="flex items-center gap-2">
        <span>ACABA EM:</span>
        <div className="flex items-center gap-1 font-mono">
          <span className="bg-foreground/20 rounded px-1.5 py-0.5">{hours}</span>
          <span>:</span>
          <span className="bg-foreground/20 rounded px-1.5 py-0.5">{minutes}</span>
          <span>:</span>
          <span className="bg-foreground/20 rounded px-1.5 py-0.5">{seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
