import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

const STEPS = [
  {
    number: '01',
    title: 'Request a Quote',
    body: 'Tell us about your property and cleaning requirements.',
  },
  {
    number: '02',
    title: 'Discuss Your Needs',
    body: 'Our team will review the enquiry and discuss suitable arrangements.',
  },
  {
    number: '03',
    title: 'Enjoy the Results',
    body: 'Professional cleaning with attention to detail.',
  },
];

export default function Process() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="Our Process" title="Effortless from start to finish." />

        <ol className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <li key={step.number} className="h-full">
              <Reveal delay={index * 150} className="flex h-full flex-col border-t border-charcoal pt-8">
                <span className="font-display text-6xl font-medium leading-none text-gold">{step.number}</span>
                <h3 className="mt-8 font-display text-3xl font-medium leading-tight">{step.title}</h3>
                <p className="mt-4 text-base leading-[1.5] text-graphite">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
