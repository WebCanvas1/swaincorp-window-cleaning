import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { SERVICES, type Service } from '@/data/services';

interface ServicesProps {
  onRequestQuote: (serviceName: string) => void;
}

export default function Services({ onRequestQuote }: ServicesProps) {
  const [featured, others] = [SERVICES.slice(0, 2), SERVICES.slice(2)];

  return (
    <section id="services" className="bg-stone py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="Our Services" title="Exceptional care for every surface." />

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {featured.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 120} variant="featured" onRequestQuote={onRequestQuote} />
          ))}
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 100} variant="compact" onRequestQuote={onRequestQuote} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  delay: number;
  variant: 'featured' | 'compact';
  onRequestQuote: (serviceName: string) => void;
}

function ServiceCard({ service, delay, variant, onRequestQuote }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `${service.id}-details`;
  const featured = variant === 'featured';

  return (
    <Reveal delay={delay} className="h-full">
      <article id={service.id} className="group flex h-full scroll-mt-24 flex-col bg-white">
        <div className={`img-zoom relative overflow-hidden ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <img
            src={service.image.src}
            alt={service.image.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {service.image.placeholder && (
            <span className="absolute left-4 top-4 bg-charcoal/85 px-3 py-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ivory">
              Placeholder image
            </span>
          )}
        </div>

        <div className={`flex flex-1 flex-col ${featured ? 'p-8 sm:p-10' : 'p-6'}`}>
          <p className="eyebrow">{service.audience}</p>
          <h3 className={`mt-4 font-display font-medium leading-[1.15] ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
            {service.name}
          </h3>
          <p className="mt-4 text-sm leading-[1.5] text-graphite">{service.summary}</p>

          <div
            className={`grid transition-[grid-template-rows] duration-700 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden">
              <div id={panelId} className="pt-6">
                <p className="text-sm leading-[1.5] text-graphite">{service.details}</p>
                <ul className="mt-5 space-y-3">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-charcoal" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4 pt-8">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setExpanded((open) => !open)}
              className="inline-flex w-fit items-center gap-2 border-b border-charcoal/30 pb-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:border-gold"
            >
              {expanded ? 'Show less' : 'Learn more'}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <a
              href="#quote"
              onClick={() => onRequestQuote(service.name)}
              className="btn-secondary w-full sm:w-auto"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
