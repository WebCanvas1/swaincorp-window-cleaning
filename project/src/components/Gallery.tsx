import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { GALLERY_CATEGORIES, GALLERY_ITEMS, type GalleryCategory } from '@/data/gallery';

export default function Gallery() {
  const [category, setCategory] = useState<GalleryCategory>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = category === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === category);
  const current = openIndex === null ? null : visible[openIndex];

  const step = (direction: 1 | -1) => {
    setOpenIndex((index) => (index === null ? index : (index + direction + visible.length) % visible.length));
  };

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null);
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, visible.length]);

  return (
    <section id="gallery" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Our Work" title="The difference is in the details." />

          <div role="tablist" aria-label="Gallery categories" className="flex flex-wrap gap-2">
            {GALLERY_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => {
                  setCategory(item);
                  setOpenIndex(null);
                }}
                className={`border px-5 py-2.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                  category === item
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-charcoal/20 text-graphite hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {visible.map((item, index) => (
            <Reveal key={item.src} delay={(index % 3) * 80}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Open image: ${item.alt}`}
                className="img-zoom group relative block w-full overflow-hidden text-left"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className={`w-full object-cover ${
                    item.aspect === 'portrait' ? 'aspect-[3/4]' : item.aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-charcoal/85 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory">
                    {item.category}
                  </span>
                  {item.placeholder && (
                    <span className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-gold">Placeholder</span>
                  )}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4 sm:p-10"
          onClick={() => setOpenIndex(null)}
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="animate-[fade-in_500ms_ease-out] max-h-full max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-xs uppercase tracking-[0.2em] text-ivory/80">
            {current.placeholder ? 'Placeholder image' : current.category} {openIndex! + 1} / {visible.length}
          </p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpenIndex(null);
            }}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center border border-ivory/30 text-ivory transition-colors hover:border-gold hover:text-gold sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory transition-colors hover:text-gold sm:left-8"
          >
            <ChevronLeft className="h-8 w-8" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory transition-colors hover:text-gold sm:right-8"
          >
            <ChevronRight className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
