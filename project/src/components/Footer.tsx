import { Facebook } from 'lucide-react';
import type { ReactNode } from 'react';
import BrandLogo from '@/components/BrandLogo';
import { BUSINESS } from '@/data/business';
import { SERVICES } from '@/data/services';
import { SERVICE_REGIONS } from '@/data/serviceAreas';

const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Service Areas', href: '#areas' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal pb-28 pt-20 text-ivory md:pb-20 lg:pt-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-4">
          <BrandLogo />
          <p className="mt-8 max-w-sm text-sm leading-[1.5] text-ivory/70">
            Professional residential and commercial window cleaning across the Brisbane metropolitan area, backed by
            over 15 years of experience.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Swaincorp Window Cleaning on Facebook"
              className="flex h-11 w-11 items-center justify-center border border-ivory/25 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <FooterColumn title="Navigate">
            {NAV.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {SERVICES.map((service) => (
              <FooterLink key={service.id} href={`#${service.id}`}>
                {service.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Service Areas">
            {SERVICE_REGIONS.map((region) => (
              <FooterLink key={region.id} href="#areas">
                {region.name}
              </FooterLink>
            ))}
            <li className="pt-4">
              <a href={BUSINESS.phoneHref} className="font-display text-2xl text-ivory transition-colors hover:text-gold">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
          </FooterColumn>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-4 border-t border-ivory/10 px-6 pt-8 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <p>
          &copy; {year} {BUSINESS.name}. All rights reserved.
        </p>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-gold">{title}</p>
      <ul className="mt-6 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <li>
      <a href={href} className="text-sm text-ivory/75 transition-colors hover:text-ivory">
        {children}
      </a>
    </li>
  );
}
