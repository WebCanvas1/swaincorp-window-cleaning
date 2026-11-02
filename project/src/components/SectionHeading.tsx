import type { ReactNode } from 'react';
import Reveal from '@/components/Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
}

export default function SectionHeading({ eyebrow, title, align = 'left', tone = 'light' }: SectionHeadingProps) {
  const centered = align === 'center';
  const titleColor = tone === 'dark' ? 'text-ivory' : 'text-charcoal';
  const eyebrowColor = tone === 'dark' ? 'text-gold' : 'text-graphite';

  return (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <div className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
        {!centered && <span className="h-px w-10 bg-gold" aria-hidden="true" />}
        <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p>
        {centered && <span className="h-px w-10 bg-gold" aria-hidden="true" />}
      </div>
      <h2
        className={`mt-6 font-display text-4xl font-medium uppercase leading-[1.12] sm:text-5xl lg:text-6xl ${titleColor}`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
