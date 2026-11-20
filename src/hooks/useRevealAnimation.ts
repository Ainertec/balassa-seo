import { useEffect } from 'react';

/**
 * Animação de entrada suave para elementos marcados com `data-reveal`.
 *
 * A animação é aplicada via Web Animations API em vez de classes de opacidade
 * permanentes: assim nenhum bloco cria contexto de empilhamento depois de
 * finalizado (o que alteraria a pintura de gradientes/imagens com alpha) e o
 * conteúdo permanece visível caso o IntersectionObserver não rode.
 */
export function useRevealAnimation() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (nodes.length === 0) return;

    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || typeof IntersectionObserver === 'undefined' || !supportsAnimation()) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          const animation = element.animate(
            [
              { opacity: 0, transform: 'translateY(18px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' },
          );
          // Libera o efeito ao final: nenhuma animação ativa permanece na página.
          animation.addEventListener('finish', () => animation.cancel(), { once: true });
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function supportsAnimation(): boolean {
  return typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';
}
