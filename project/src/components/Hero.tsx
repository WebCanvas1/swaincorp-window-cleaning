import { useEffect, useRef } from 'react';
import Reveal from '@/components/Reveal';

const HERO_IMAGE = {
  src: 'https://images.pexels.com/photos/37320179/pexels-photo-37320179.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  alt: 'Placeholder: sleek glass skyscraper reflecting the sky (temporary hero image)',
};

export default function Hero() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY, window.innerHeight) * 0.25;
        image.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal text-ivory">
      <img
        ref={imageRef}
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fetchPriority="high"
        className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/95" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 sm:px-10 lg:px-16 lg:pb-28">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold" aria-hidden="true" />
            <p className="eyebrow text-gold">Brisbane's Window Cleaning Specialists</p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="mt-8 font-display text-[3.25rem] font-medium uppercase leading-[1.02] sm:text-7xl lg:text-[6.5rem]">
            A Clearer View.
            <br />
            <span className="text-ivory/90">A Better Impression.</span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-8 max-w-xl text-base leading-[1.5] text-ivory/85 sm:text-lg">
            Professional window cleaning for Brisbane homes and businesses. Experience beautifully clean glass,
            exceptional attention to detail and reliable service from an experienced local team.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#quote" className="btn-light">Request a Quote</a>
            <a href="#services" className="btn-ghost-light">Explore Our Services</a>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <p className="mt-12 flex items-center gap-3 font-sans text-sm font-medium tracking-wide text-ivory/80">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            Over 15 Years of Experience
          </p>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about Swaincorp"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/70 transition-colors hover:text-gold md:flex"
      >
        <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-eyebrow">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-ivory/20">
          <span className="animate-scroll-line absolute inset-0 bg-gold" />
        </span>
      </a>
    </section>
  );
}
