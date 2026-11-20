import { useId, useState } from 'react';
import { FAQ } from '../../data/content';
import { SectionHeading } from '../SectionHeading';
import { Plus } from '../icons';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="section section--light" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Antes de iniciarmos a conversa"
          description="Transparência desde o primeiro contato — do prazo de resultados ao formato de engajamento."
          align="left"
          id="faq-title"
        />

        <div className="faq-list">
          {FAQ.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div key={item.question} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <Plus className="faq-item__icon" width={18} height={18} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-item__panel"
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
