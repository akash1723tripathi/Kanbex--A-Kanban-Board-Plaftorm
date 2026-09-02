'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';
import { headerNavLinks, headerCTA } from '@/data/navigation/header';
import { RotatingText, type RotatingTextRef } from '@/components/ui';
import { SpecularButton } from '@/components/ui';
import {
  mobileMenuVariants,
  mobileMenuItemVariants,
} from '@/lib/animations';

function NavbarLink({ label, href }: { label: string; href: string }) {
  const ref = useRef<RotatingTextRef>(null);

  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors relative py-1 overflow-hidden inline-flex items-center"
      onMouseEnter={() => ref.current?.next()}
    >
      <RotatingText
        ref={ref}
        texts={[label, label]}
        auto={false}
        loop={true}
        staggerFrom="first"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        staggerDuration={0.015}
        splitLevelClassName="overflow-hidden pb-0.5"
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        splitBy="characters"
        mainClassName="inline-flex"
      />
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [macbookTransitionActive, setMacbookTransitionActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const transition = document.querySelector('[data-macbook-transition]');
    if (!transition) return;

    const observer = new IntersectionObserver(
      ([entry]) => setMacbookTransitionActive(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(transition);
    return () => observer.disconnect();
  }, []);

  const isPill = scrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 flex flex-col ${isPill
          ? 'w-[calc(100%-32px)] md:w-[calc(100%-64px)] max-w-[1240px] bg-white/80 backdrop-blur-md border border-gray-100 rounded-full mt-4 shadow-lg'
          : mobileMenuOpen
            ? 'w-full bg-white/90 backdrop-blur-md border-b border-gray-100'
            : 'w-full max-w-[1440px]  backdrop-blur-md border-b border-gray-100/20'
        } ${macbookTransitionActive && !mobileMenuOpen ? '-translate-y-full opacity-0 pointer-events-none' : ''}`}
    >
      <div
        className={`w-full flex items-center justify-between transition-all duration-500 ${isPill
            ? 'pl-10 pr-8 h-[64px]'
            : 'px-6 lg:px-[100px] h-[82px]'
          }`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Logo className="h-9 w-auto text-gray-800" />
        </Link>
        <div className="hidden lg:flex items-center gap-10">
          {headerNavLinks.map((link) => (
            <NavbarLink
              key={link.label}
              label={link.label}
              href={link.href}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <SpecularButton
            size="sm"
            radius={isPill ? 999 : 7}
            tint="#6f5bd3"
            baseColor="#4a329e"
            autoAnimate
            onClick={() => { window.location.href = headerCTA.href; }}
          >
            {headerCTA.text}
          </SpecularButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
              className="px-6 py-4 space-y-3"
            >
              {headerNavLinks.map((link) => (
                <motion.div key={link.label} variants={mobileMenuItemVariants}>
                  <Link
                    href={link.href}
                    className="block text-gray-600 hover:text-gray-900 text-base font-medium py-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileMenuItemVariants}>
                <SpecularButton
                  size="sm"
                  radius={7}
                  className="mt-4 block w-full"
                  tint="#6f5bd3"
                  baseColor="#4a329e"
                  autoAnimate
                  onClick={() => { setMobileMenuOpen(false); window.location.href = headerCTA.href; }}
                >
                  {headerCTA.text}
                </SpecularButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
