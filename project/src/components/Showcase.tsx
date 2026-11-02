import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { ORIGINAL_IMAGES } from '@/data/business';

const SHOWCASE = [
  {
    key: 'residential',
    eyebrow: 'Residential',
    title: 'Let the light back in.',
    body: 'Clean glass lets natural light flood every room. Professional window cleaning keeps your home bright, fresh and well cared for, whether it is a house, a townhouse or a unit.',
    cta: 'Residential Services',
    image: ORIGINAL_IMAGES.newConstruction,
    alt: 'Clean windows of a new construction home',
  },
  {
    key: 'commercial',
    eyebrow: 'Commercial',
    title: 'A professional impression, inside and out.',
    body: 'A clean, bright and presentable workplace makes a lasting impression on clients and staff. Our commercial team works around your schedule, including after-hours availability where needed.',
    cta: 'Commercial Services',
    image: ORIGINAL_IMAGES.commercialBuilding,
    alt: 'Glass windows of a commercial building',
  },
];

export default function Showcase() {
  return (
    <section className="bg-ivory">
      {SHOWCASE.map((item, index) => {
        const reversed = index % 2 === 1;
        return (
          <div
            key={item.key}
            className={`mx-auto grid max-w-[90rem] items-stretch lg:grid-cols-2 ${index > 0 ? 'border-t border-stone' : ''}`}
          >
            <Reveal className={`img-zoom relative min-h-[24rem] overflow-hidden lg:min-h-[44rem] ${reversed ? 'lg:order-2' : ''}`}>
              <img src={item.image} alt={item.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </Reveal>

            <div className={`flex items-center px-6 py-20 sm:px-12 lg:px-20 xl:px-28 ${reversed ? 'lg:order-1' : ''}`}>
              <Reveal delay={150} className="max-w-lg">
                <p className="eyebrow">{item.eyebrow}</p>
                <h2 className="mt-6 font-display text-4xl font-medium uppercase leading-[1.12] sm:text-5xl">
                  {item.title}
                </h2>
                <p className="mt-6 text-base leading-[1.5] text-graphite">{item.body}</p>
                <a
                  href="#services"
                  className="group mt-10 inline-flex items-center gap-4 border-b border-charcoal pb-2 font-sans text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:border-gold"
                >
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
