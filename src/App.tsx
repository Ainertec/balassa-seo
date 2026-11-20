import { useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InstallBanner } from './components/InstallBanner';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Method } from './components/sections/Method';
import { Excellence } from './components/sections/Excellence';
import { Faq } from './components/sections/Faq';
import { Contact } from './components/sections/Contact';
import { CtaBanner } from './components/sections/CtaBanner';
import { useInstallPrompt } from './hooks/useInstallPrompt';
import { useServiceWorker } from './hooks/useServiceWorker';
import { useRevealAnimation } from './hooks/useRevealAnimation';

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function App() {
  const { canInstall, isInstalled, promptInstall } = useInstallPrompt();
  const { needsRefresh, offlineReady, applyUpdate } = useServiceWorker();
  useRevealAnimation();

  // Rolagem respeitando a preferência de movimento reduzido
  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.replaceState(null, '', `#${id}`);
  }, []);

  // Link direto (#servicos) após a montagem da página
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <a className="skip-link" href="#inicio">
        Ir para o conteúdo
      </a>

      <Header canInstall={canInstall} onInstall={promptInstall} onNavigate={scrollToSection} />

      <main id="conteudo">
        <Hero canInstall={canInstall} onInstall={promptInstall} />
        <Services />
        <Method />
        <Excellence />
        <Faq />
        <Contact />
        <CtaBanner />
      </main>

      <Footer onNavigate={scrollToSection} />

      <InstallBanner canInstall={canInstall} isInstalled={isInstalled} onInstall={promptInstall} />

      {needsRefresh ? (
        <div className="update-toast" role="status">
          <span>Nova versão disponível.</span>
          <button type="button" className="btn btn--gold btn--sm" onClick={applyUpdate}>
            Atualizar
          </button>
        </div>
      ) : offlineReady ? (
        <div className="update-toast" role="status">
          <span>Pronto para uso offline.</span>
        </div>
      ) : null}
    </>
  );
}
