import { LinkButton } from '../LinkButton';
import { ArrowRight, Download, Spark } from '../icons';
import { SITE } from '../../data/content';
import { asset } from '../../lib/assets';

interface HeroProps {
  canInstall: boolean;
  onInstall: () => void;
}

const PROOF_POINTS = ['SEO técnico', 'Autoridade de conteúdo', 'Link building de elite'];

export function Hero({ canInstall, onInstall }: HeroProps) {
  return (
    <section id="inicio" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid-lines" aria-hidden="true" />

      <div className="container container--wide hero__inner">
        <div className="hero__copy">
          <span className="hero__badge" data-reveal>
            <Spark width={14} height={14} aria-hidden="true" />
            Consultoria SEO de alto padrão
          </span>

          <h1 className="hero__title" data-reveal>
            Domínio absoluto, autoridade digital e{' '}
            <em className="text-gold-gradient">prestígio orgânico</em>
          </h1>

          <p className="hero__lead" data-reveal>
            Estratégias sob medida para marcas que exigem excelência, visibilidade refinada e
            posições de liderança incontestável nos motores de busca.
          </p>

          <div className="hero__actions" data-reveal>
            <LinkButton
              href="#contato"
              variant="gold"
              size="lg"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<ArrowRight width={18} height={18} />}
            >
              Solicitar Reunião Estratégica
            </LinkButton>
            {canInstall ? (
              <button type="button" className="btn btn--ghost btn--lg" onClick={onInstall}>
                <Download className="btn__lead-icon" width={18} height={18} />
                <span>Instalar aplicativo</span>
              </button>
            ) : (
              <LinkButton href="#servicos" variant="ghost" size="lg">
                Explorar pilares
              </LinkButton>
            )}
          </div>

          <ul className="hero__proof" data-reveal>
            {PROOF_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <figure className="hero__visual" data-reveal>
          <div className="hero__logocard">
            <img
              src={asset('logo.webp')}
              alt={`Marca ${SITE.name} — SEO e Growth`}
              width={520}
              height={520}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="hero__caption">
            <span>Balassa</span>
            <span aria-hidden="true">—</span>
            <span>SEO &amp; Growth</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
