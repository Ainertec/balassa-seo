import { NAV_LINKS, SITE } from '../data/content';
import { LinkButton } from './LinkButton';
import { ArrowUpRight, Mail, MapPin, Phone } from './icons';
import { asset } from '../lib/assets';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src={asset('logo.webp')} alt="Balassa — SEO & Growth" width={64} height={64} loading="lazy" />
          <p>
            Consultoria exclusiva de SEO para marcas que enxergam a visibilidade orgânica como
            ativo estratégico.
          </p>
          <LinkButton href={SITE.whatsappUrl} variant="outline" target="_blank" rel="noreferrer">
            Falar com um consultor
          </LinkButton>
        </div>

        <nav className="site-footer__column" aria-label="Navegação do rodapé">
          <h3>Navegar</h3>
          {[...NAV_LINKS, { label: 'Contato', href: '#contato' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(link.href.replace('#', ''));
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-footer__column">
          <h3>Contato</h3>
          <a href={`mailto:${SITE.email}`}>
            <Mail width={16} height={16} />
            {SITE.email}
          </a>
          <a href={SITE.phoneHref}>
            <Phone width={16} height={16} />
            {SITE.phone}
          </a>
          <span>
            <MapPin width={16} height={16} />
            {SITE.address}
          </span>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>
          &copy; {year} {SITE.name} SEO &amp; Growth. Todos os direitos reservados.
        </p>
        <p className="site-footer__signature">
          Elegância e performance em SEO
          <ArrowUpRight width={14} height={14} />
        </p>
      </div>
    </footer>
  );
}
