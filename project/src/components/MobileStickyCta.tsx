import { Phone } from 'lucide-react';
import { BUSINESS } from '@/data/business';

export default function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-ivory/95 p-3 shadow-[0_-8px_24px_-16px_rgba(32,39,43,0.3)] backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] gap-3">
        <a
          href={BUSINESS.phoneHref}
          aria-label={`Call ${BUSINESS.phoneDisplay}`}
          className="flex h-14 w-14 items-center justify-center border border-charcoal text-charcoal transition-colors active:bg-charcoal active:text-ivory"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
        <a href="#quote" className="btn-primary h-14">
          Request a Quote
        </a>
      </div>
    </div>
  );
}
