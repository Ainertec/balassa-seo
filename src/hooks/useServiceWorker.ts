import { useEffect, useRef, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

type UpdateServiceWorker = (reloadPage?: boolean) => Promise<void>;

/**
 * Registra o service worker (apenas em produção) e sinaliza quando uma nova
 * versão estiver pronta para ser aplicada.
 */
export function useServiceWorker() {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const updateRef = useRef<UpdateServiceWorker | null>(null);

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    updateRef.current = registerSW({
      onNeedRefresh: () => setNeedsRefresh(true),
      onOfflineReady: () => setOfflineReady(true),
      immediate: true,
    });
  }, []);

  const applyUpdate = () => {
    setNeedsRefresh(false);
    void updateRef.current?.(true);
  };

  return { needsRefresh, offlineReady, applyUpdate };
}
