import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { BUSINESS } from '@/data/business';
import { SERVICE_REGIONS } from '@/data/serviceAreas';

export default function ServiceAreas() {
  const [activeId, setActiveId] = useState(SERVICE_REGIONS[0].id);
  const [query, setQuery] = useState('');

  const active = SERVICE_REGIONS.find((region) => region.id === activeId) ?? SERVICE_REGIONS[0];
  const totalSuburbs = SERVICE_REGIONS.reduce((sum, region) => sum + region.suburbs.length, 0);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return SERVICE_REGIONS.flatMap((region) =>
      region.suburbs
        .filter((suburb) => suburb.toLowerCase().includes(term))
        .map((suburb) => ({ suburb, region: region.name })),
    );
  }, [query]);

  return (
    <section id="areas" className="bg-stone py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Service Areas" title="Brisbane, from end to end." />
            <Reveal delay={150}>
              <p className="mt-8 text-base leading-[1.5] text-graphite">
                Swaincorp Window Cleaning services the {BUSINESS.serviceArea} {BUSINESS.serviceRadius}. Find your
                suburb below and call our friendly team to arrange a quote.
              </p>
              <p className="mt-6 font-display text-2xl text-charcoal">{totalSuburbs} suburbs across six regions</p>
              <a href={BUSINESS.phoneHref} className="btn-primary mt-10">Call {BUSINESS.phoneDisplay}</a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <label htmlFor="suburb-search" className="sr-only">
              Search suburbs
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite" aria-hidden="true" />
              <input
                id="suburb-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for your suburb"
                className="w-full border border-charcoal/15 bg-white py-4 pl-12 pr-5 font-sans text-base text-charcoal placeholder:text-graphite/70 focus:border-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              />
            </div>

            {query.trim() ? (
              <div className="mt-8 bg-white p-6 sm:p-10">
                <p className="eyebrow">
                  {matches.length} {matches.length === 1 ? 'match' : 'matches'} for "{query.trim()}"
                </p>
                {matches.length === 0 ? (
                  <p className="mt-6 text-sm text-graphite">
                    We could not find that suburb in our list. Call {BUSINESS.phoneDisplay} to ask about your location.
                  </p>
                ) : (
                  <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                    {matches.map(({ suburb, region }) => (
                      <li key={`${region}-${suburb}`} className="border-b border-stone pb-3">
                        <span className="block font-medium text-charcoal">{suburb}</span>
                        <span className="block text-xs text-graphite">{region}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <>
                <div role="tablist" aria-label="Service regions" className="mt-8 flex gap-2 overflow-x-auto pb-2">
                  {SERVICE_REGIONS.map((region) => (
                    <button
                      key={region.id}
                      id={`tab-${region.id}`}
                      type="button"
                      role="tab"
                      aria-selected={region.id === active.id}
                      aria-controls="region-panel"
                      onClick={() => setActiveId(region.id)}
                      className={`shrink-0 border px-5 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                        region.id === active.id
                          ? 'border-charcoal bg-charcoal text-ivory'
                          : 'border-charcoal/20 bg-white text-graphite hover:border-charcoal hover:text-charcoal'
                      }`}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>

                <div id="region-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} key={active.id} className="mt-6 animate-[fade-in_600ms_ease-out] bg-white">
                  <div className="grid gap-0 sm:grid-cols-5">
                    <div className="img-zoom relative aspect-[4/3] overflow-hidden sm:col-span-2 sm:aspect-auto">
                      <img src={active.image} alt={`${active.name} window cleaning`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="p-6 sm:col-span-3 sm:p-8">
                      <h3 className="font-display text-3xl font-medium leading-tight">{active.name}</h3>
                      <p className="mt-4 text-sm leading-[1.5] text-graphite">{active.description}</p>
                      <p className="eyebrow mt-6">{active.suburbs.length} suburbs</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-stone p-6 sm:grid-cols-3 sm:p-8">
                    {active.suburbs.map((suburb) => (
                      <li key={suburb} className="text-sm text-charcoal">
                        {suburb}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
