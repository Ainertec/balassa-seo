import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Duração da animação em milissegundos. */
  duration?: number;
  /** Valor inicial (útil quando o contador pode ser reiniciado). */
  from?: number;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Anima um número de 0 até `target` quando o elemento entra na viewport.
 * Respeita `prefers-reduced-motion`, mantendo a acessibilidade do conteúdo.
 */
export function useCountUp<T extends HTMLElement>(
  target: number,
  { duration = 1600, from = 0 }: Options = {},
) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : from));

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || target === 0) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      start ??= timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutCubic para desaceleração elegante
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = progress >= 1 ? target : Math.round(target * eased);
      setValue((current) => (next > current ? next : current));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const begin = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        begin();
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(node);

    // Garante o valor final mesmo se o observer não disparar (ex.: aba em segundo
    // plano, layout virtualizado ou impressão/PDF).
    const safety = window.setTimeout(() => setValue(target), duration + 2000);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
    };
  }, [target, duration]);

  return { ref, value };
}
