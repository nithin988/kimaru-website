import type { ReactNode, AnchorHTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from './motion';

export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;
const onProduct = typeof location !== 'undefined' && /\/[a-z-]+\.html$/.test(location.pathname) && !/index\.html$/.test(location.pathname);
/** Links to a home-page section work from either page. */
export const homeHref = (h: string) => (!h.startsWith('#') || !onProduct ? h : `${import.meta.env.BASE_URL}${h}`);
export const PRODUCT_URL = `${import.meta.env.BASE_URL}product.html`;
export const SOLUTION_URL = `${import.meta.env.BASE_URL}production-commitment.html`;
export const RESULTS_URL = `${import.meta.env.BASE_URL}results.html`;
export const COMPANY_URL = `${import.meta.env.BASE_URL}company.html`;
// Same links the live kimaru.ai site uses: the founder's meeting link for the walkthrough, the contact form for everything else.
export const BOOK_URL = 'https://meetings.hubspot.com/evan-burkosky';
export const CONTACT_URL = 'https://kimaru.ai/contact-us/';
export const WALKTHROUGH_URL = `${import.meta.env.BASE_URL}walkthrough.html`;

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
  // Kimaru ActionButton rules: h-10, 6px radius, no hover colour. Primary is slate-900, secondary is slate-100.
  const v = {
    brand: 'bg-primary text-primary-foreground border-primary',
    dark: 'bg-primary text-primary-foreground border-primary',
    outline: 'bg-secondary text-foreground border-secondary',
    light: 'bg-white text-primary border-white',
  }[variant];
  return (
    <a
      {...rest}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-md border text-sm font-semibold no-underline [&_svg]:size-4',
        size === 'lg' ? 'px-5' : 'px-4',
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
    <Reveal className={cn('mb-12 max-w-3xl', className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.08] text-primary">{title}</h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{body}</p>}
    </Reveal>
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
  mobileAspect,
  fade,
  compact,
  children,
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
  imgClassName?: string;
  aspect?: string;
  mobileAspect?: string;
  /** Softly fades the bottom of the screenshot, for decorative crops that stop mid-screen. */
  fade?: boolean;
  /** Narrow decorative frames: no right-hand label, titles stay on one line. */
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cn('relative min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-24px_rgb(37_59_127/0.35)]', className)}>
      <div className="flex items-center gap-2 border-b border-border bg-panel px-3.5 py-2.5 text-xs text-muted-foreground">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 whitespace-nowrap font-semibold text-foreground">{title}</span>
        {!compact && <span className="ml-auto hidden text-[11px] sm:inline">Synthetic demo data</span>}
      </div>
      <div className="relative w-full overflow-hidden [aspect-ratio:var(--arm,var(--ar))] md:[aspect-ratio:var(--ar)]" style={{ ['--ar' as string]: aspect, ['--arm' as string]: mobileAspect }}>
        <img
          src={asset(src)}
          alt={alt}
          loading="lazy"
          className={cn('absolute inset-0 h-full w-full object-cover', !imgClassName?.includes('object-') && 'object-top', imgClassName)}
          style={fade ? { WebkitMaskImage: 'linear-gradient(to bottom, #000 62%, transparent 100%)', maskImage: 'linear-gradient(to bottom, #000 62%, transparent 100%)' } : undefined}
        />
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

/**
 * Sharp zoomed crop of a platform screenshot. cx and cy are the focal point as a fraction of the full image,
 * zoom is how much bigger than the frame the image is drawn.
 */
export function Thumb({ src, cx, cy, zoom, cap, className }: { src: string; cx: number; cy: number; zoom: number; cap?: string; className?: string }) {
  const pos = (c: number) => (zoom <= 1 ? 50 : Math.max(0, Math.min(100, ((c * zoom - 0.5) / (zoom - 1)) * 100)));
  return (
    <div className={cn('thumb relative aspect-[16/10] overflow-hidden border-b border-border bg-panel', className)}>
      <div
        role="img"
        aria-label={cap}
        className="thumb-img absolute inset-0"
        style={{ backgroundImage: `url(${asset(src)})`, backgroundSize: `${zoom * 100}%`, backgroundPosition: `${pos(cx)}% ${pos(cy)}%`, backgroundRepeat: 'no-repeat', ['--z' as string]: `${zoom * 100}%`, ['--z2' as string]: `${zoom * 108}%` }}
      />
      {cap && <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow">{cap}</span>}
    </div>
  );
}

/** Full-bleed photo. Scaled slightly from the top-left so any corner mark in the bottom-right falls outside the frame. */
export function Photo({ src, className, pos = '50% 50%' }: { src: string; className?: string; pos?: string }) {
  return (
    <div className={cn('relative overflow-hidden bg-panel', className)}>
      <img src={asset(src)} alt="" loading="lazy" className="absolute inset-0 h-full w-full origin-top-left scale-[1.08] object-cover" style={{ objectPosition: pos }} />
    </div>
  );
}
