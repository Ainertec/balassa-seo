import { MetricCard } from './MetricCard';
import { SectionHeading } from '../SectionHeading';
import { DIFERENCIAIS, METRICAS } from '../../data/content';
import { Check } from '../icons';
import { asset } from '../../lib/assets';

export function Excellence() {
  return (
    <section id="excelencia" className="section section--beige" aria-labelledby="excelencia-title">
      <div className="container">
        <SectionHeading
          eyebrow="Excelência comprovada"
          title="Resultados que sustentam a reputação"
          description="Números de uma operação que trata cada projeto como uma parceria de longo prazo."
          id="excelencia-title"
        />

        <div className="metrics">
          <MetricCard metric={METRICAS[0]} />
          <figure className="metric-banner">
            <img
              className="metric-banner__image"
              src={asset('banner.webp')}
              alt="Balassa SEO & Growth"
              width={640}
              height={427}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <MetricCard metric={METRICAS[1]} />
          <MetricCard metric={METRICAS[2]} />
          <MetricCard metric={METRICAS[3]} />
        </div>

        <div className="excellence-grid">
          <div className="excellence-grid__intro" data-reveal>
            <h3 className="excellence-grid__title">O que diferencia a Balassa</h3>
            <p className="excellence-grid__text">
              Trabalhamos com um número limitado de clientes por período para preservar a atenção
              sênior, a discrição e a profundidade de cada entrega.
            </p>
          </div>

          {/* Deliberadamente fora de [data-reveal]: o bloco com data-reveal
              cria um contexto de empilhamento que quebraria o texto dourado
              da logo (ordem de pintura entre ::before/::after e img). */}
          <div className="advantage-list">
            {DIFERENCIAIS.map((item) => (
              <div key={item.title} className="advantage-list__item">
                <span className="advantage-list__icon" aria-hidden="true">
                  <Check width={16} height={16} />
                </span>
                <div>
                  <h4 className="advantage-list__title">{item.title}</h4>
                  <p className="advantage-list__text">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
