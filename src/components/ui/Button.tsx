import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'inverted' | 'outline-inverted';
export type ButtonSize = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'> & {
    /** Enlace externo, ancla (#seccion), tel: o wa.me. */
    href: string;
    to?: never;
  };

type RouterProps = CommonProps &
  Omit<LinkProps, keyof CommonProps | 'to'> & {
    /** Ruta interna de react-router. */
    to: string;
    href?: never;
  };

type NativeProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: never;
    to?: never;
  };

export type ButtonProps = AnchorProps | RouterProps | NativeProps;

const base =
  'inline-flex items-center justify-center gap-2 rounded-ui font-semibold whitespace-nowrap ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ' +
  'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50 active:translate-y-px';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white shadow-brand hover:bg-brand-700',
  secondary: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
  outline: 'border border-slate-300 bg-white text-slate-800 hover:border-brand-400 hover:text-brand-700',
  ghost: 'text-slate-700 hover:bg-slate-100 hover:text-brand-700',
  whatsapp: 'bg-whatsapp text-white shadow-card hover:bg-whatsapp-hover',
  // Para fondos oscuros (hero, secciones tone="brand").
  inverted: 'bg-white text-brand-800 shadow-card hover:bg-brand-50',
  'outline-inverted': 'border border-white/30 text-white hover:border-white/60 hover:bg-white/10',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
};

function omitStyleProps<T extends CommonProps>(props: T): Omit<T, keyof CommonProps> {
  const rest: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (key !== 'variant' && key !== 'size' && key !== 'className' && key !== 'children') {
      rest[key] = value;
    }
  }
  return rest as Omit<T, keyof CommonProps>;
}

/**
 * Botón único del sitio. Renderiza <Link>, <a> o <button> según reciba `to`, `href` o nada.
 * Un solo radio, una sola tipografía, cinco variantes. No crear botones a mano fuera de aquí.
 */
export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.to !== undefined) {
    const { to, ...rest } = omitStyleProps(props as RouterProps);
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (props.href !== undefined) {
    const { href, ...rest } = omitStyleProps(props as AnchorProps);
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const rest = omitStyleProps(props as NativeProps);
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
