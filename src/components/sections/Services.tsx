import { PILLARS } from '../../data/content';
import { SectionHeading } from '../SectionHeading';
import { ArrowUpRight, Check } from '../icons';

export function Services() {
  return (
    <section id="servicos" className="section section--light" aria-labelledby="servicos-title">
      <div className="container">
        <SectionHeading
          eyebrow="Pilares de atuação"
          title="Arquitetura de visibilidade"
          description="Três frentes integradas que transformam a presença digital da sua marca em um ativo difícil de replicar."
          id="servicos-title"
        />

        <div className="pillars">
          {PILLARS.map((pillar) => (
            <article key={pillar.index} className="pillar-card" data-reveal>
              <div className="pillar-card__head">
                <span className="pillar-card__index">{pillar.index}</span>
                <ArrowUpRight width={20} height={20} className="pillar-card__arrow" />
              </div>
              <h3 className="pillar-card__title">{pillar.title}</h3>
              <p className="pillar-card__text">{pillar.description}</p>
              <ul className="pillar-card__topics">
                {pillar.topics.map((topic) => (
                  <li key={topic}>
                    <Check className="pillar-card__topic-icon" width={14} height={14} aria-hidden="true" />
                    {topic}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
