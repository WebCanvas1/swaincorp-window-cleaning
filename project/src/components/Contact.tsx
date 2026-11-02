import { Facebook, Globe, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { BUSINESS } from '@/data/business';

export default function Contact() {
  return (
    <section id="contact" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:px-16">
        <div>
          <SectionHeading eyebrow="Contact Us" title="Speak with our team." />
          <Reveal delay={150}>
            <p className="mt-8 max-w-lg text-base leading-[1.5] text-graphite">
              Thank you for contacting Swaincorp Window Cleaning, the leading Brisbane window cleaning specialists, with
              over 15 years of experience. We service both commercial and domestic clients in the Brisbane metropolitan
              area.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150} className="self-end">
          <div className="grid gap-px bg-stone">
            <ContactRow icon={Phone} label="Phone">
              <a href={BUSINESS.phoneHref} className="font-display text-3xl font-medium transition-colors hover:text-graphite">
                {BUSINESS.phoneDisplay}
              </a>
            </ContactRow>
            <ContactRow icon={MapPin} label="Service area">
              <span className="text-base text-charcoal">
                {BUSINESS.serviceArea}, {BUSINESS.serviceRadius}
              </span>
            </ContactRow>
            <ContactRow icon={Globe} label="Website">
              <a href={BUSINESS.website} className="break-all text-base text-charcoal underline underline-offset-4 hover:text-graphite">
                brisbanewindowcleaning.com.au
              </a>
            </ContactRow>
            <ContactRow icon={Facebook} label="Facebook">
              <a
                href={BUSINESS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-charcoal underline underline-offset-4 hover:text-graphite"
              >
                Follow Swaincorp on Facebook
              </a>
            </ContactRow>
          </div>
          <a href={BUSINESS.phoneHref} className="btn-primary mt-10 w-full sm:w-auto">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Tap to call
          </a>
        </Reveal>
      </div>
    </section>
  );
}

interface ContactRowProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

function ContactRow({ icon: Icon, label, children }: ContactRowProps) {
  return (
    <div className="flex items-start gap-5 bg-white p-6 sm:p-8">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-charcoal" strokeWidth={1.5} aria-hidden="true" />
      <div>
        <p className="eyebrow mb-2">{label}</p>
        {children}
      </div>
    </div>
  );
}
