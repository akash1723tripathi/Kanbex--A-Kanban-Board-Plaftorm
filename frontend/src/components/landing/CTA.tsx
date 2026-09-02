'use client';

import { motion } from 'framer-motion';
import { ctaContent } from '@/data/landing/cta';
import { easing, scrollViewport, fadeInUp as baseFadeInUp } from '@/lib/animations';
import { RippleDistortion, SpecularButton } from '@/components/ui';

export function CTA() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.8, ease: easing.smooth }}
          className="relative overflow-hidden bg-gray-900 rounded-[36px] px-6 py-12 md:px-12 md:py-16 lg:p-20"
        >
          <RippleDistortion strength={0.12} brushSize={180} rings={3} tint="#806de5" tintAmount={0.16} glint={0.18} />
          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-[936px] mx-auto">
            {/* Heading */}
            <motion.h2
              variants={baseFadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={scrollViewport}
              transition={{ duration: 0.7, ease: easing.smooth, delay: 0.1 }}
              className="text-[32px] md:text-[44px] lg:text-[56px] font-medium text-white leading-[1.2] text-center capitalize max-w-[718px]"
            >
              {ctaContent.heading}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={baseFadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={scrollViewport}
              transition={{ duration: 0.7, ease: easing.smooth, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-white/70 text-center leading-[1.5] max-w-[936px]"
            >
              {ctaContent.description}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={baseFadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={scrollViewport}
              transition={{ duration: 0.7, ease: easing.smooth, delay: 0.3 }}
            >
              <SpecularButton
                size="sm"
                tint="#806de5"
                baseColor="#563bb2"
                autoAnimate
                onClick={() => { window.location.href = ctaContent.buttonHref; }}
              >
                {ctaContent.buttonText}
              </SpecularButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
