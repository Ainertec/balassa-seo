import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'center' | 'left';
  /** Use variantes claras quando a seção tiver fundo escuro. */
  tone?: 'dark' | 'light';
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  id,
}: SectionHeadingProps) {
  const classes = ['section-heading', `section-heading--${align}`, `section-heading--${tone}`].join(
    ' ',
  );

  return (
    <div className={classes} data-reveal>
      <span className="eyebrow">
        <span className="eyebrow__line" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  );
}
