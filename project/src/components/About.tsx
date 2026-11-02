import { CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { ORIGINAL_IMAGES } from '@/data/business';

const EMPHASIS = [
  'Experienced professional cleaners',
  'Quality cleaning products',
  'Modern cleaning techniques',
  'Attention to detail',
  'Reliable service',
  'Spotless, streak-free results',
];

export default function About() {
  return (
    <section id="about" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:gap-20 lg:px-16">
        <Reveal className="relative lg:col-span-6">
          <div className="img-zoom relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
            <img
              src={ORIGINAL_IMAGES.modernHouse}
              alt="Modern house with pool and clean glass windows"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden h-full w-full border border-gold sm:-right-6 sm:block" aria-hidden="true" />
        </Reveal>

        <div className="flex flex-col justify-center lg:col-span-6 lg:pl-6">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <p className="eyebrow">Welcome to Swaincorp</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-4xl font-medium uppercase leading-[1.12] sm:text-5xl lg:text-6xl">
              Where every detail makes a difference.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 space-y-5 text-base leading-[1.5] text-graphite">
              <p>
                Swaincorp Window Cleaning provides professional residential and commercial window cleaning throughout
                Brisbane, backed by over 15 years of experience.
              </p>
              <p>
                Our team of trained, specialist, professional window cleaners will ensure your windows are free from dirt
                and grime. We utilise the highest quality products, as well as the latest techniques for a result that is
                streak-free and spotless.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {EMPHASIS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium text-charcoal">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-charcoal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={400}>
            <a
              href="#why-swaincorp"
              className="group mt-12 inline-flex w-fit items-center gap-4 border-b border-charcoal pb-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:border-gold hover:text-graphite"
            >
              Discover Our Story
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
