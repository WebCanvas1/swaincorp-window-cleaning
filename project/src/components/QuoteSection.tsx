import { Phone, ShieldCheck, Clock3 } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import Reveal from '@/components/Reveal';
import { BUSINESS, ORIGINAL_IMAGES } from '@/data/business';

interface QuoteSectionProps {
  selectedService: string;
}

export default function QuoteSection({ selectedService }: QuoteSectionProps) {
  return (
    <section id="quote" className="bg-stone py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <p className="eyebrow">Request a Quote</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-4xl font-medium uppercase leading-[1.12] sm:text-5xl">
              Let's make your windows shine.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-base leading-[1.5] text-graphite">
              Tell us a little about your property and cleaning requirements, and our team will be in touch.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-12 space-y-6 border-t border-charcoal/15 pt-8">
              <li className="flex items-start gap-4 text-sm text-charcoal">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                Responsive communication and flexible service arrangements.
              </li>
              <li className="flex items-start gap-4 text-sm text-charcoal">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                Your details are handled with respect for your privacy and confidentiality.
              </li>
              <li className="flex items-start gap-4 text-sm text-charcoal">
                <Phone className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                Prefer to talk? Call <a href={BUSINESS.phoneHref} className="font-semibold underline underline-offset-4 hover:text-graphite">{BUSINESS.phoneDisplay}</a>.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={400}>
            <div className="img-zoom relative mt-12 hidden aspect-[16/10] overflow-hidden lg:block">
              <img src={ORIGINAL_IMAGES.glassInterior} alt="Clean glass windows in a modern home interior" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-7">
          <QuoteForm selectedService={selectedService} />
        </Reveal>
      </div>
    </section>
  );
}
