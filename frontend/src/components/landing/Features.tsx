'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  LayoutDashboard,
  MessageCircle,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { featuresSection } from '@/data/landing/features';
import { easing, getStaggerDelay, scrollViewport } from '@/lib/animations';
import { RippleDistortion } from '@/components/ui';

const featureIcons: Record<string, LucideIcon> = {
  precision: ClipboardCheck,
  collaborate: UsersRound,
  track: BarChart3,
};

const featureAccents = [
  { icon: 'bg-[#eeeafe] text-[#5748b6]', number: 'text-[#5748b6]', line: 'bg-[#d9d2ff]' },
  { icon: 'bg-[#e7f5f0] text-[#18745c]', number: 'text-[#18745c]', line: 'bg-[#c6e6da]' },
  { icon: 'bg-[#fff2dc] text-[#a4600c]', number: 'text-[#a4600c]', line: 'bg-[#f2d7a8]' },
];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative overflow-hidden bg-[#f5f4f1] py-20 lg:py-[132px]"
    >
      <div
        className="absolute left-1/2 top-0 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-[#e9e5ff]/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.7, ease: easing.smooth }}
          className="mx-auto max-w-[740px] text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#5748b6]">
            {featuresSection.eyebrow}
          </p>
          <h2
            id="features-heading"
            className="text-[38px] font-medium leading-[1.08] tracking-[-0.04em] text-[#1e1c1a] md:text-[52px]"
          >
            {featuresSection.header}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-7 text-[#5d5a55] md:text-lg">
            {featuresSection.description}
          </p>
        </motion.div>

        <div className="relative mt-12 overflow-hidden rounded-[28px] border border-[#dedcd7] bg-white shadow-[0_20px_60px_rgba(35,30,20,0.06)] lg:mt-[68px]">
          <div className="grid divide-y divide-[#e8e6e1] md:grid-cols-3 md:divide-x md:divide-y-0">
            {featuresSection.features.map((feature, index) => {
              const Icon = featureIcons[feature.id] || LayoutDashboard;
              const accent = featureAccents[index] || featureAccents[0];

              return (
                <motion.article
                  key={feature.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={scrollViewport}
                  transition={{
                    duration: 0.65,
                    ease: easing.smooth,
                    delay: getStaggerDelay(index, 0.08, 0.1),
                  }}
                  className="group relative flex min-h-[330px] flex-col p-7 md:p-8 lg:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={['text-5xl font-medium leading-none tracking-[-0.06em]', accent.number].join(' ')}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={['flex size-11 items-center justify-center rounded-2xl', accent.icon].join(' ')}
                    >
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </div>

                  <div className="mt-auto pt-14">
                    <h3 className="max-w-[280px] text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#201e1b]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 max-w-[300px] text-sm leading-6 text-[#6d6962]">
                      {feature.description}
                    </p>
                  </div>

                  {index < featuresSection.features.length - 1 && (
                    <span
                      className={[
                        'absolute bottom-0 left-1/2 hidden h-px w-12 -translate-x-1/2 md:block lg:left-auto lg:right-[-24px] lg:top-1/2 lg:bottom-auto lg:z-10 lg:w-12',
                        accent.line,
                      ].join(' ')}
                      aria-hidden="true"
                    />
                  )}
                </motion.article>
              );
            })}
          </div>

          <div className="flex items-center gap-3 border-t border-[#e8e6e1] bg-[#fbfaf8] px-7 py-4 text-xs text-[#6d6962] md:px-10">
            <span className="flex size-6 items-center justify-center rounded-full bg-[#e7f5f0] text-[#18745c]">
              <Check size={14} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span>{featuresSection.reassurance}</span>
          </div>
        </div>

        <div className="mt-24 grid gap-6 lg:mt-32 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.7, ease: easing.smooth }}
            className="relative overflow-hidden rounded-[28px] bg-[#201e1b] p-7 text-white md:p-10"
          >
            <RippleDistortion strength={0.11} brushSize={145} rings={3} tint="#806de5" tintAmount={0.15} glint={0.14} />
            {/* Restricted wrapper to ~50% width for eyebrow & title */}
            <div className="relative z-10 max-w-full md:max-w-[48%]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/75">
                <Sparkles size={13} aria-hidden="true" />
                {featuresSection.secondary.dark.eyebrow}
              </span>
              <h3 className="mt-8 text-[32px] font-medium leading-[1.08] tracking-[-0.04em] text-[#d9d2ff] md:text-[38px]">
                {featuresSection.secondary.dark.title}
              </h3>
            </div>

            {/* Floating Mockup Card */}
            <div
              className="relative z-10 mt-10 h-[172px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-4 md:absolute md:top-10 md:right-5 md:mt-0 md:h-[190px] md:w-[285px]"
              aria-hidden="true"
            >
              <div className="flex items-center justify-between text-[10px] text-white/45">
                <span>Website refresh</span>
                <span className="rounded-full bg-[#d9d2ff]/15 px-2 py-1 text-[#d9d2ff]">On track</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {['To do', 'In progress', 'Done'].map((lane, laneIndex) => (
                  <div key={lane} className="rounded-lg bg-white/[0.06] p-2">
                    <div className="mb-2 flex items-center justify-between text-[8px] text-white/45">
                      <span>{lane}</span>
                      <span>{laneIndex + 2}</span>
                    </div>
                    {[0, 1].map((card) => (
                      <div
                        key={card}
                        className={[
                          'mb-1.5 h-7 rounded-md border border-white/[0.08] bg-white/[0.09]',
                          laneIndex === 2 && card === 1 ? 'opacity-40' : '',
                        ].join(' ')}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Full-width section below mockup with increased top margin */}
            <div className="relative z-10 mt-12 md:mt-16">
              <p className="max-w-xl text-sm leading-6 text-white/75">
                {featuresSection.secondary.dark.description}
              </p>
              <Link
                href="/login"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#d9d2ff]"
              >
                See Kanbex in action
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div
              className="absolute -bottom-24 -right-20 size-72 rounded-full bg-[#5748b6]/35 blur-3xl"
              aria-hidden="true"
            />
          </motion.div>

          {/* Light Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.7, ease: easing.smooth, delay: 0.1 }}
            className="relative overflow-hidden rounded-[28px] border border-[#dedcd7] bg-white p-7 md:p-10"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#fff2dc] text-[#a4600c]">
              <MessageCircle size={22} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <h3 className="mt-8 max-w-[400px] text-[32px] font-medium leading-[1.08] tracking-[-0.04em] text-[#201e1b] md:text-[40px]">
              {featuresSection.secondary.light.title}
            </h3>
            <p className="mt-4 max-w-[420px] text-sm leading-6 text-[#6d6962]">
              {featuresSection.secondary.light.description}
            </p>

            <div
              className="mt-9 flex items-end gap-3 border-t border-[#eeece8] pt-7"
              aria-hidden="true"
            >
              <div className="flex h-16 flex-1 items-end gap-1.5">
                {[34, 48, 40, 61, 56, 76, 92, 82, 100].map((height, index) => (
                  <div
                    key={index}
                    className={[
                      'w-full rounded-t-sm',
                      index > 5 ? 'bg-[#5748b6]' : 'bg-[#e4defd]',
                    ].join(' ')}
                    style={{ height: height + '%' }}
                  />
                ))}
              </div>
              <div className="min-w-[92px]">
                <div className="text-2xl font-semibold tracking-[-0.04em] text-[#201e1b]">
                  9 tasks
                </div>
                <div className="mt-1 text-[11px] text-[#77736d]">completed this week</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#77736d]">
              <span className="size-2 rounded-full bg-[#18745c]" />
              Clear ownership. Fewer follow-ups.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
