import Reveal from '@/components/Reveal';
import { ORIGINAL_IMAGES } from '@/data/business';

export default function ProtectInvestment() {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:gap-20 lg:px-16">
        <Reveal className="img-zoom relative overflow-hidden lg:col-span-5">
          <img
            src={ORIGINAL_IMAGES.nightHouse}
            alt="Modern house with illuminated windows at night"
            loading="lazy"
            className="aspect-[4/5] h-full w-full object-cover"
          />
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              <p className="eyebrow text-gold">Protect Your Investment</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-4xl font-medium uppercase leading-[1.12] sm:text-5xl">
              Beautiful windows. Long-term care.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 space-y-5 text-base leading-[1.5] text-ivory/80">
              <p>
                Dusty, gritty windows can be costing you money without you even realising it. Grit can get into the seals
                and wear away at the glass surface, which can cause weakness and loose fittings. In severe storms, that
                can be dangerous.
              </p>
              <p>
                Regular window maintenance helps to alleviate these problems, saving you money in the long run. Because
                of this, you are less likely to have to replace windows unnecessarily.
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <a href="#quote" className="btn-light mt-12">Request a Quote</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
