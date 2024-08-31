'use client';

import { TechnologiesSection } from '@/types';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type TechnologiesProps = {
  technologiesSection: TechnologiesSection;
};

export default function Technologies({ technologiesSection }: TechnologiesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [randomizedTechnologies, setRandomizedTechnologies] = useState<TechnologiesSection['technologies']>([]);

  useEffect(() => {
    // Randomize the order of technologies
    const shuffled = [...technologiesSection.technologies].sort(() => 0.5 - Math.random());
    setRandomizedTechnologies(shuffled);
  }, [technologiesSection.technologies]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || randomizedTechnologies.length === 0) return;

    // Clone the items to create a constant flow loop
    const originalItems = scrollElement.children[0];
    const clonedItems = originalItems.cloneNode(true);
    scrollElement.appendChild(clonedItems);

    // Calculate the total width of the items (original + clone)
    const totalWidth = originalItems.scrollWidth;

    gsap.to(scrollElement, {
      x: `-${totalWidth}px`,
      duration: 50,
      ease: 'none',
      repeat: -1, // Infinite loop
    });
  }, [randomizedTechnologies]);

  return (
    <section className="pt-32 pb-64 bg-black">
      <h2 className="text-[3.5vw] md:text-[2.5vw] lg:text-[1.5vw] text-center mb-28 text-amber-400 font-medium">
        {technologiesSection.title.toLocaleUpperCase()}
      </h2>
      <div className="relative overflow-hidden">
        <div ref={scrollRef} className="flex whitespace-nowrap">
          <div className="inline-block">
            {randomizedTechnologies.map((tech, index) => (
              <div key={index} className="inline-block mx-12 svg-white"> {/* Apply the svg-white class */}
                <Image
                  src={tech.logo.asset.url}
                  alt={tech.name}
                  width={80}
                  height={80}
                  className="w-auto h-20 max-w-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
