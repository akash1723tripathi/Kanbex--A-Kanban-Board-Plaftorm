'use client';

import Image from 'next/image';
import { testimonialsSection } from '@/data/landing/testimonials';

// ---------- types ----------
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
}

// ---------- card ----------
function TestimonialCard({ t }: { t: Testimonial }) {
  const avatarSrc = t.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&size=200`;

  return (
    <div className="bg-linear-to-b from-[#020204] to-[#191130] border border-gray-200 rounded-xl p-6 mb-4 hover:border-gray-300 hover:shadow-sm transition-all duration-300">
      {/* Quote icon */}
      <div className="mb-4">
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#6B7280" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13.056c.464 0 .91-.131 1.237-.364.329-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88C7.91 6.97 7.464 6.838 7 6.838c-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.513-.879.328-.233.773-.364 1.237-.364.232 0 .455-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.619-.181c-1.392 0-2.728.393-3.712 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.513.88.328.233.773.364 1.237.364zm9.83 0c.465 0 .91-.131 1.238-.364.328-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88-.328-.233-.773-.364-1.237-.364-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.512-.879.329-.233.774-.364 1.238-.364.232 0 .454-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.62-.181c-1.391 0-2.727.393-3.711 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.512.88.329.233.774.364 1.238.364z" />
          </g>
        </svg>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-5 leading-relaxed">{t.quote}</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative size-9 flex-shrink-0">
          <Image
            src={avatarSrc}
            alt={t.name}
            fill
            sizes="36px"
            className="object-cover rounded-full border border-gray-200"
            unoptimized
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{t.name}</p>
          <p className="text-xs text-gray-400">{t.role} – {t.company}</p>
        </div>
      </div>
    </div>
  );
}

// ---------- scrolling column ----------
function ScrollColumn({
  items,
  animClass,
}: {
  items: Testimonial[];
  animClass: string;
}) {
  // duplicate items so the scroll loops seamlessly
  const doubled = [...items, ...items];
  return (
    <div className={animClass}>
      {doubled.map((t, idx) => (
        <TestimonialCard key={`${t.id}-${idx}`} t={t} />
      ))}
    </div>
  );
}

// ---------- section ----------
export function Testimonials() {
  const all = testimonialsSection.testimonials as Testimonial[];

  // Split 9 testimonials into 3 groups of 3
  const col1 = all.slice(0, 3);
  const col2 = all.slice(3, 6);
  const col3 = all.slice(6, 9);

  return (
    <section className="bg-gray-50 py-16 lg:py-[120px] px-4 sm:px-6 lg:px-[100px]">
      {/* scroll animations */}
      <style>{`
        @keyframes scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .kanbex-scroll-1 { animation: scroll-up 28s linear infinite; }
        .kanbex-scroll-2 { animation: scroll-up 22s linear infinite; }
        .kanbex-scroll-3 { animation: scroll-up 32s linear infinite; }
      `}</style>

      <div className="max-w-[1440px] mx-auto flex flex-col gap-12 lg:gap-[72px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium text-black leading-[1.2] capitalize max-w-[460px]">
            {testimonialsSection.header}
          </h2>
          <p className="text-lg lg:text-xl text-gray-500/70 leading-[1.5] max-w-[494px]">
            {testimonialsSection.description}
          </p>
        </div>

        {/* Scrolling grid */}
        <div className="relative w-full overflow-hidden">
          {/* top & bottom fade overlays */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[620px] overflow-hidden">
            {/* column 1 – always visible */}
            <ScrollColumn items={col1} animClass="kanbex-scroll-1" />

            {/* column 2 – tablet + desktop */}
            <div className="hidden md:block">
              <ScrollColumn items={col2} animClass="kanbex-scroll-2" />
            </div>

            {/* column 3 – desktop only */}
            <div className="hidden lg:block">
              <ScrollColumn items={col3} animClass="kanbex-scroll-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
