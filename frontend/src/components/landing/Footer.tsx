'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { footerContent } from '@/data/navigation/footer';
import { Linkedin, Github, Twitter, Instagram } from 'lucide-react';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin: Linkedin,
  Github: Github,
  Twitter: Twitter,
  Instagram: Instagram,
};

export function Footer() {
  const productColumn = footerContent.columns.find(
    (col) => col.title.toLowerCase() === 'product'
  );

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
          .font-geist { font-family: "Geist", sans-serif; }
        `}
      </style>

      <footer className="font-geist flex flex-col justify-end bg-gradient-to-b from-black via-zinc-950 to-[#0B0914] pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden w-full text-white">
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-between">
          
          {/* Top Row: Brand & Tagline Left, Product Links & Social Icons Right */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            
            {/* Brand / Logo Section */}
            <div className="flex flex-col items-start text-left max-w-md">
              <Link href="/">
                <Logo variant="light" className="text-white" />
              </Link>
              <div className="w-full max-w-52 h-0.5 mt-6 bg-gradient-to-r from-[#3B2968] to-transparent"></div>
              <p className="text-sm text-white/60 mt-4 leading-relaxed">
                {footerContent.tagline}
              </p>
            </div>

            {/* Product Links (Horizontal 2-line wrap) & Social Logos */}
            <div className="flex flex-col gap-6 lg:items-end w-full lg:w-auto">
              
              {/* Product Links Horizontal Wrap */}
              {productColumn && (
                <div className="flex flex-col items-start lg:items-end">
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                    {productColumn.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-8 gap-y-3 max-w-md lg:justify-end">
                    {productColumn.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Link Logos/Icons */}
              <div className="flex items-center gap-3 mt-1">
                {footerContent.social.map((social) => {
                  const IconComponent = socialIcons[social.icon] || Github;
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300"
                      aria-label={social.platform}
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Large Watermark Title with Spacing & Gradient */}
          <div className="w-full flex justify-center my-14 lg:my-24">
            <h1 className="text-center font-extrabold tracking-tighter leading-[0.70] text-[clamp(4.5rem,19.5vw,25rem)] pointer-events-none select-none bg-gradient-to-b from-zinc-700 via-zinc-850 to-zinc-950 bg-clip-text text-transparent opacity-95">
              Kanbex
            </h1>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-6 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

          {/* Bottom Row: All Rights Reserved Moved to Absolute Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-y-4 gap-x-2 relative z-10 text-xs text-white/60">
            <p>© {new Date().getFullYear()} Kanbex. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <div className="w-px h-3.5 bg-white/20"></div>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

export default Footer;
