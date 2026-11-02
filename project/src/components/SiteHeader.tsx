import { useEffect, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { BUSINESS } from '@/data/business';
import { SERVICES } from '@/data/services';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Service Areas', href: '#areas' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;
  const textTone = solid ? 'text-charcoal' : 'text-ivory';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'border-b border-stone bg-ivory py-3 shadow-[0_1px_0_rgba(32,39,43,0.04)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 sm:px-10 lg:px-16 ${textTone}`}>
        <BrandLogo className="transition-colors duration-500" />

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          <a href="#top" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>

          <div className="group relative">
            <a href="#services" className="nav-link inline-flex items-center gap-1.5">
              Services
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />
            </a>
            <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border border-gold/60 bg-ivory p-3 shadow-[0_18px_40px_-24px_rgba(32,39,43,0.35)]">
                {SERVICES.map((service) => (
                  <a
                    key={service.id}
                    href={`#${service.id}`}
                    className="block px-4 py-3 font-sans text-sm text-charcoal transition-colors duration-200 hover:bg-stone"
                  >
                    {service.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="#areas" className="nav-link">Service Areas</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a href={BUSINESS.phoneHref} className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide transition-opacity hover:opacity-70">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
          <a href="#quote" className={solid ? 'btn-primary' : 'btn-light'}>Request a Quote</a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={BUSINESS.phoneHref}
            aria-label={`Call ${BUSINESS.name} on ${BUSINESS.phoneDisplay}`}
            className={`flex h-11 w-11 items-center justify-center border ${solid ? 'border-charcoal/20' : 'border-ivory/40'}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`flex h-11 w-11 items-center justify-center border ${solid ? 'border-charcoal/20' : 'border-ivory/40'}`}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 top-0 z-40 flex flex-col bg-charcoal px-6 pb-10 pt-28 text-ivory transition-all duration-500 lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col divide-y divide-ivory/10">
          {NAV_LINKS.slice(0, 2).map((link) => (
            <MobileLink key={link.href} href={link.href} onNavigate={() => setMenuOpen(false)}>
              {link.label}
            </MobileLink>
          ))}
          <div className="py-5">
            <p className="eyebrow text-gold">Services</p>
            <div className="mt-4 grid gap-3">
              {SERVICES.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl text-ivory/90 transition-colors hover:text-gold"
                >
                  {service.name}
                </a>
              ))}
            </div>
          </div>
          {NAV_LINKS.slice(2).map((link) => (
            <MobileLink key={link.href} href={link.href} onNavigate={() => setMenuOpen(false)}>
              {link.label}
            </MobileLink>
          ))}
        </nav>

        <div className="mt-auto grid gap-4 pt-10">
          <a href={BUSINESS.phoneHref} className="btn-ghost-light">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {BUSINESS.phoneDisplay}
          </a>
          <a href="#quote" onClick={() => setMenuOpen(false)} className="btn-light">
            Request a Quote
          </a>
        </div>
      </div>
    </header>
  );
}

function MobileLink({ href, onNavigate, children }: { href: string; onNavigate: () => void; children: string }) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="py-5 font-display text-3xl text-ivory transition-colors hover:text-gold"
    >
      {children}
    </a>
  );
}
