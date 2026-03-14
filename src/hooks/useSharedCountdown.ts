import { useEffect, useState } from "react";

// Duração total da oferta: 1h 28m 17s em segundos
const TOTAL_SECONDS = 1 * 60 * 60 + 28 * 60 + 17;

// Mantém o início compartilhado entre componentes durante a sessão
const startTimestamp = Date.now();

const getRemainingSeconds = () => {
  const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
  const remaining = TOTAL_SECONDS - elapsed;
  return remaining > 0 ? remaining : 0;
};

export const useSharedCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(() => getRemainingSeconds());

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft(getRemainingSeconds());
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  return secondsLeft;
};

