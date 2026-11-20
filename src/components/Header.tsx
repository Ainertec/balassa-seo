import { useEffect, useState } from 'react';
import { NAV_LINKS, SITE } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { Download, Menu, Close } from './icons';
import { asset } from '../lib/assets';

const SECTION_IDS = ['inicio', 'servicos', 'metodo', 'excelencia', 'faq', 'contato'];

interface HeaderProps {
  canInstall: boolean;
  onInstall: () => void;
  onNavigate: (id: string) => void;
}

export function Header({ canInstall, onInstall, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloqueia o scroll do body e fecha o menu com ESC
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    onNavigate(href.replace('#', ''));
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <a
          className="brand"
          href="#inicio"
          onClick={(event) => {
            event.preventDefault();
            go('#inicio');
          }}
          aria-label={`${SITE.name} ${SITE.tagline} — início`}
        >
          <img src={asset('logo.webp')} alt="" width={44} height={44} className="brand__mark" />
          <span className="brand__text">
            <span className="brand__name">{SITE.name}</span>
            <span className="brand__tagline">{SITE.tagline}</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`site-nav__link${active === id ? ' is-active' : ''}`}
                aria-current={active === id ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  go(link.href);
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="site-header__actions">
          {canInstall ? (
            <button type="button" className="btn btn--ghost btn--sm" onClick={onInstall}>
              <Download className="btn__lead-icon" width={16} height={16} aria-hidden="true" />
              <span>Instalar app</span>
            </button>
          ) : null}
          <a
            className="btn btn--primary btn--sm"
            href="#contato"
            onClick={(event) => {
              event.preventDefault();
              go('#contato');
            }}
          >
            Private Access
          </a>
          <button
            type="button"
            className="site-header__burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <Close width={22} height={22} /> : <Menu width={22} height={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
      >
        <nav className="mobile-menu__nav" aria-label="Navegação mobile">
          {[...NAV_LINKS, { label: 'Contato', href: '#contato' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu__link"
              onClick={(event) => {
                event.preventDefault();
                go(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {canInstall ? (
          <button type="button" className="btn btn--outline btn--block" onClick={onInstall}>
            <Download className="btn__lead-icon" width={16} height={16} />
            Instalar aplicativo
          </button>
        ) : null}
      </div>
    </header>
  );
}
