import { PROCESSO } from '../../data/content';
import { SectionHeading } from '../SectionHeading';

export function Method() {
  return (
    <section id="metodo" className="section section--dark" aria-labelledby="metodo-title">
      <div className="container">
        <SectionHeading
          eyebrow="Método Balassa"
          title="Um protocolo em quatro atos"
          description="Processo desenhado para marcas que não toleram improviso: cada etapa entrega um artefato concreto e mensurável."
          tone="dark"
          id="metodo-title"
        />

        <ol className="process">
          {PROCESSO.map((phase) => (
            <li key={phase.step} className="process__step" data-reveal>
              <div className="process__marker" aria-hidden="true">
                <span className="process__dot" />
              </div>
              <div className="process__content">
                <span className="process__eyebrow">{phase.step}</span>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
                <span className="process__deliverable">{phase.deliverable}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
