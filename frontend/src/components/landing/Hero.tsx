'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { heroContent } from '@/data/landing/hero';
import GradientWaves from './GradientWaves';
import { SpecularButton } from '@/components/ui';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative h-screen min-h-[100vh] pt-[91px] pb-16 overflow-hidden">
      {/* Background Gradient Waves */}
      <div className="absolute inset-0 pointer-events-none -z-0">
        <GradientWaves
          horizonColor="#491fef"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={3.85}
          waveScale={0.7}
          waveRatio={0.9}
          swell={35}
          turbulence={15}
          tilt={1.02}
          zoom={1.0}
          height={6.6}
          fogDepth={22}
          detail="medium"
          brightness={0.8}
          opacity={0.64}
          mouseInteraction={true}
          parallaxStrength={0.52}
          grain={true}
          grainIntensity={0.05}
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        {/* Hero Content */}
        <div className="text-center max-w-[785px] mx-auto pt-[88px]">
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-[#f5f5f5] rounded-full px-2 py-1.5 mb-3"
          >
            <span className="bg-[#090909] text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
              {heroContent.badge.label}
            </span>
            <span className="text-[#090909] text-base pr-1">
              {heroContent.badge.text}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[48px] md:text-[64px] lg:text-[76px] font-medium text-black leading-[1.2] tracking-tight capitalize"
          >
            {heroContent.headline.line1}
            <br />
            {heroContent.headline.line2}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[rgba(68,69,78,0.7)] max-w-[749px] mx-auto mt-[22px] leading-[1.5]"
          >
            {heroContent.subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mt-7"
          >
            <SpecularButton
              radius={12}
              className="h-[52px] min-w-[168px] px-8 text-base font-semibold"
              tint="#6f5bd3"
              baseColor="#4a329e"
              autoAnimate
              onClick={() => { window.location.href = heroContent.cta.primary.href; }}
            >
              {heroContent.cta.primary.text}
            </SpecularButton>
            <Link
              href={heroContent.cta.secondary.href}
              className="inline-flex h-[52px] min-w-[168px] items-center justify-center rounded-[12px] bg-white px-8 text-base font-semibold capitalize text-[#262730] shadow-[0px_-0.5px_1px_0px_rgba(0,0,0,0.15),0px_1px_1px_0px_rgba(0,0,0,0.3)] transition-colors hover:bg-gray-50"
            >
              {heroContent.cta.secondary.text}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
