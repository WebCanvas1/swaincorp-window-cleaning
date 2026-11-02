import { Clock, HardHat, Leaf, Lock, MessageCircle, CalendarDays, Sparkles, Users, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

const STRENGTHS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Clock, title: 'Over 15 Years of Experience', body: 'An established local business with a long record of dependable service across Brisbane.' },
  { icon: Users, title: 'Trained Professional Cleaners', body: 'A courteous, dedicated team of trained specialists who take care of your windows.' },
  { icon: Sparkles, title: 'Quality Products & Techniques', body: 'We use the highest quality products and the latest techniques for streak-free results.' },
  { icon: HardHat, title: 'Occupational Health & Safety', body: 'A serious approach to safety on every site, for our team and for your property.' },
  { icon: Leaf, title: 'Ecological Sustainability', body: 'We consider the environmental impact of our work and the products we choose.' },
  { icon: Lock, title: 'Security, Privacy & Confidentiality', body: 'We respect your property, your privacy and the confidentiality of your premises.' },
  { icon: MessageCircle, title: 'Responsive Communication', body: 'Prompt responses to requests, with clear management, audits and updates.' },
  { icon: CalendarDays, title: 'Flexible Service Arrangements', body: 'Services tailored to your location and schedule, with after-hours availability if necessary.' },
];

export default function WhyChoose() {
  return (
    <section id="why-swaincorp" className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="Why Choose Swaincorp"
          title={
            <>
              Experience you can see.
              <br />
              Quality you can trust.
            </>
          }
        />

        <div className="mt-20 grid gap-px bg-stone sm:grid-cols-2 lg:grid-cols-4">
          {STRENGTHS.map(({ icon: Icon, title, body }, index) => (
            <Reveal key={title} delay={(index % 4) * 90} className="h-full">
              <div className="group flex h-full flex-col bg-white p-8 transition-colors duration-500 hover:bg-ivory">
                <Icon className="h-7 w-7 text-charcoal transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.25} aria-hidden="true" />
                <span className="mt-8 h-px w-10 bg-gold transition-all duration-500 group-hover:w-16" aria-hidden="true" />
                <h3 className="mt-6 font-display text-2xl font-medium leading-tight">{title}</h3>
                <p className="mt-4 text-sm leading-[1.5] text-graphite">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-16 flex items-center justify-center gap-3 text-center text-sm text-graphite">
            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            Swaincorp is a team of trained, professional cleaners, specialising in window, gutter, pressure, house and solar panel cleaning.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
