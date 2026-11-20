import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'gold' | 'ghost' | 'outline';
  size?: 'md' | 'lg';
  icon?: ReactNode;
  /** Ícone exibido antes do texto (ex.: download). */
  leadIcon?: ReactNode;
}

const VARIANTS = {
  primary: 'btn btn--primary',
  gold: 'btn btn--gold',
  ghost: 'btn btn--ghost',
  outline: 'btn btn--outline',
} as const;

export function LinkButton({
  variant = 'primary',
  size = 'md',
  icon,
  leadIcon,
  className = '',
  children,
  ...rest
}: LinkButtonProps) {
  const classes = [VARIANTS[variant], size === 'lg' ? 'btn--lg' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} {...rest}>
      {leadIcon ? <span className="btn__lead-icon">{leadIcon}</span> : null}
      <span>{children}</span>
      {icon ? <span className="btn__icon">{icon}</span> : null}
    </a>
  );
}
