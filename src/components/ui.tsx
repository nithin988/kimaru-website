import type { ReactNode, AnchorHTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';

export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;
export const BOOK_URL = 'https://kimaru.ai/contact-us/';

export function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

type BtnProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'brand' | 'outline' | 'dark' | 'light';
  size?: 'md' | 'lg';
};
/** Link-styled button. 40px (md) matches the product ActionButton height; 48px (lg) for page CTAs. */
export function Button({ variant = 'brand', size = 'md', className, ...rest }: BtnProps) {
  const v = {
    brand: 'bg-brand text-white border-brand hover:bg-[#1c2d63]',
    dark: 'bg-primary text-primary-foreground border-primary',
    outline: 'bg-card text-foreground border-border hover:border-ring',
    light: 'bg-white text-brand border-white hover:bg-brand-soft',
  }[variant];
  return (
    <a
      {...rest}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border font-semibold no-underline transition-colors',
        size === 'lg' ? 'h-12 px-6 text-[15px]' : 'h-10 px-4 text-sm',
        v,
        className,
      )}
    />
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground', className)}>{children}</p>;
}

export function SectionHead({ eyebrow, title, body, className }: { eyebrow: string; title: ReactNode; body?: ReactNode; className?: string }) {
  return (
    <div className={cn('mb-12 max-w-3xl', className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.08] text-primary">{title}</h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{body}</p>}
    </div>
  );
}

export function Section({ id, tone = 'plain', children, className }: { id?: string; tone?: 'plain' | 'alt'; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-20 lg:py-24', tone === 'alt' && 'border-y border-border bg-panel', className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Real platform screenshot in a browser-style frame. All shots are synthetic demo data. */
export function BrowserFrame({
  src,
  alt,
  title,
  className,
  imgClassName,
  aspect = '2000 / 1250',
  children,
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
  imgClassName?: string;
  aspect?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn('relative min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(37_59_127/0.35)]', className)}>
      <div className="flex items-center gap-2 border-b border-border bg-panel px-3.5 py-2.5 text-xs text-muted-foreground">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 font-semibold text-foreground">{title}</span>
        <span className="ml-auto hidden text-[11px] sm:inline">Synthetic demo data</span>
      </div>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
        <img src={asset(src)} alt={alt} loading="lazy" className={cn('absolute inset-0 h-full w-full object-cover object-top', imgClassName)} />
        {children}
      </div>
    </div>
  );
}

export function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}
