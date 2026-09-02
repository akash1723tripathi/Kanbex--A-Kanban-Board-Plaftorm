'use client';

import React from 'react';
import { MacbookScroll } from '@/components/ui/macbook-scroll';
import { productShowcaseContent } from '@/data/landing/product-showcase';

export function ProductShowcase() {
  return (
    <section
      className="w-full bg-white relative"
      id="product-showcase"
    >
      {/* The MacbookScroll component internally uses min-h-[200vh] for scroll
          tracking. We wrap it in a clip container so the animated elements
          never visually bleed into the Pricing section below. */}
      <div className="overflow-clip">
        <MacbookScroll
          title={
            <div className="max-w-[800px] mx-auto text-center px-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-800 leading-tight mb-4">
                {productShowcaseContent.header.line1}
                <br />
                {productShowcaseContent.header.line2}
              </h2>
              <p className="text-base lg:text-lg text-gray-500 max-w-[560px] mx-auto leading-relaxed font-normal">
                {productShowcaseContent.description}
              </p>
            </div>
          }
          src="/images/showcase/mockup.png"
          showGradient={false}
        />
      </div>
    </section>
  );
}
