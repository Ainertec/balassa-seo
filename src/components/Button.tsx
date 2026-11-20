import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'gold' | 'ghost' | 'outline';
type Size = 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  icon?: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'btn btn--primary',
  gold: 'btn btn--gold',
  ghost: 'btn btn--ghost',
  outline: 'btn btn--outline',
};

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  icon,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    VARIANTS[variant],
    size === 'lg' ? 'btn--lg' : '',
    block ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      <span>{children}</span>
      {icon ? <span className="btn__icon">{icon}</span> : null}
    </button>
  );
}