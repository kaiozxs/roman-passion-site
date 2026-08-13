import { useEffect, useState } from "react";

/**
 * Informa se a página já saiu do topo, para o cabeçalho condensar.
 * Usa rAF para não disparar layout a cada evento de scroll.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = null;

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        frame = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}
