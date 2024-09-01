'use client';

import InfiniteCarousel from '@/components/ui/InfiniteCarousel';
import { TechnologiesSection } from '@/types';
import React from 'react';

type TechnologiesProps = {
  technologiesSection: TechnologiesSection;
};

export default function Technologies({ technologiesSection }: TechnologiesProps) {
  return (
    <section className="pt-32 pb-64 bg-black">
      <h2 className="text-[3.5vw] md:text-[2.5vw] lg:text-[1.5vw] text-center mb-28 text-amber-400 font-medium">
        {technologiesSection.title.toLocaleUpperCase()}
      </h2>
      <InfiniteCarousel 
        data={technologiesSection.technologies} 
        random 
        duration={30} // Optional: Adjust duration to control scroll speed
      />
    </section>
  );
}
