'use client';

import gsap from 'gsap';
import Image from 'next/image';
import React, { memo, useEffect, useRef } from 'react';

type InfiniteCarouselProps<T> = {
  data: T[];
  className?: string;
  random?: boolean;
  duration?: number;
};

function InfiniteCarousel<T extends { logo: { asset: { url: string } }, name: string }>({
  data,
  className = '',
  random = false,
  duration = 50,
}: InfiniteCarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Shuffle the data if the random prop is true
  const items = random ? [...data].sort(() => 0.5 - Math.random()) : data;

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || items.length === 0) return;

    // Clone the items to create a constant flow loop
    const originalItems = scrollElement.children[0];
    const clonedItems = originalItems.cloneNode(true);
    scrollElement.appendChild(clonedItems);

    // Calculate the total width of the items (original + clone)
    const totalWidth = originalItems.scrollWidth;

    gsap.to(scrollElement, {
      x: `-${totalWidth}px`,
      duration: duration * items.length / 10, // Adjust duration based on data size
      ease: 'none',
      repeat: -1, // Infinite loop
    });
  }, [items, duration]);

  return (
    <div className={`relative overflow-hidden ${className}`} role="region" aria-label="Technology carousel">
      <div ref={scrollRef} className="flex whitespace-nowrap">
        <div className="inline-block">
          {items.map((item, index) => (
            <div key={index} className="inline-block mx-12 svg-white" role="img" aria-label={item.name}>
              <Image
                src={item.logo.asset.url}
                alt={item.name}
                title={item.name} // Title for tooltip-like behavior
                width={80}
                height={80}
                className="w-auto h-20 max-w-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(InfiniteCarousel);
