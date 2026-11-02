import { BUSINESS } from '@/data/business';

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${className}`} aria-label={`${BUSINESS.name} home`}>
      <img src={BUSINESS.logo} alt="" width={48} height={48} className="h-12 w-12 rounded-full" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-medium uppercase tracking-[0.12em]">Swaincorp</span>
        <span className="mt-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.32em] opacity-80">
          Window Cleaning
        </span>
      </span>
    </a>
  );
}
