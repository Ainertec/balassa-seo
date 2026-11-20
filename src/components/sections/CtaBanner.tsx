import { LinkButton } from '../LinkButton';
import { ArrowRight } from '../icons';
import { SITE } from '../../data/content';

export function CtaBanner() {
  return (
    <section className="cta-banner" aria-labelledby="cta-title">
      <div className="cta-banner__glow" aria-hidden="true" />
      <div className="container cta-banner__inner">
        <p className="cta-banner__eyebrow">{SITE.tagline}</p>
        <h2 className="cta-banner__title" id="cta-title">
          Sua marca merece ser <em className="text-gold-gradient">encontrada primeiro</em>.
        </h2>
        <p className="cta-banner__lead">
          Agenda limitada para novos diagnósticos neste trimestre. Reserve uma conversa
          confidencial com nossa diretoria.
        </p>
        <div className="cta-banner__actions">
          <LinkButton
            href="#contato"
            variant="gold"
            size="lg"
            icon={<ArrowRight width={18} height={18} />}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Solicitar diagnóstico
          </LinkButton>
          <LinkButton href={SITE.whatsappUrl} variant="ghost" size="lg" target="_blank" rel="noreferrer">
            Falar por WhatsApp
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
