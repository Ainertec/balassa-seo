import { useEffect, useState } from 'react';
import { asset } from '../lib/assets';

interface InstallBannerProps {
  canInstall: boolean;
  isInstalled: boolean;
  onInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
}

const STORAGE_KEY = 'balassa:install-banner-dismissed';

function isIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * Aviso discreto de instalação da PWA. No Android/desktop usa o prompt nativo;
 * no iOS, exibe as instruções de "Adicionar à Tela de Início".
 */
export function InstallBanner({ canInstall, isInstalled, onInstall }: InstallBannerProps) {
  const [dismissed, setDismissed] = useState(true);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) === '1';
    setDismissed(stored);
  }, []);

  useEffect(() => {
    if (canInstall) setIosHint(false);
  }, [canInstall]);

  const visible = !isInstalled && !dismissed && (canInstall || isIos());
  if (!visible) return null;

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, '1');
    setDismissed(true);
  };

  const handleClick = async () => {
    if (!canInstall) {
      setIosHint(true);
      return;
    }
    const outcome = await onInstall();
    if (outcome === 'accepted') dismiss();
  };

  return (
    <aside className="install-banner" aria-label="Instalar aplicativo Balassa">
      <img
        className="install-banner__logo"
        src={asset('icons/icon-192.png')}
        alt=""
        width={40}
        height={40}
      />
      <div className="install-banner__text">
        <strong>Instale o app Balassa</strong>
        <span>
          {iosHint
            ? 'Toque em Compartilhar e escolha “Adicionar à Tela de Início”.'
            : 'Acesso rápido e conteúdo disponível offline.'}
        </span>
      </div>
      {!iosHint ? (
        <button type="button" className="btn btn--gold btn--sm" onClick={handleClick}>
          Instalar
        </button>
      ) : null}
      <button type="button" className="install-banner__close" onClick={dismiss} aria-label="Dispensar">
        ×
      </button>
    </aside>
  );
}
