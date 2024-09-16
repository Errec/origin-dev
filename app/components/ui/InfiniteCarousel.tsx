'use client';

import gsap from 'gsap';
import Image from 'next/image';
import React, { memo, useEffect, useRef } from 'react';

type InfiniteCarouselProps<T> = {
  data: T[];
  className?: string;
  duration?: number;
};

function InfiniteCarousel<
  T extends {
    logo: { asset: { _ref?: string; _id?: string } | null };
    name: string;
    logoUrl?: string | null;
  },
>({ data, className = '', duration = 50 }: InfiniteCarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || data.length === 0) return;

    const originalItems = scrollElement.children[0];
    const clonedItems = originalItems.cloneNode(true);
    scrollElement.appendChild(clonedItems);

    const totalWidth = originalItems.scrollWidth;

    gsap.to(scrollElement, {
      x: `-${totalWidth}px`,
      duration: (duration * data.length) / 10,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(scrollElement);
    };
  }, [data, duration]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role="region"
      aria-label="Technology carousel"
    >
      <div ref={scrollRef} className="flex whitespace-nowrap">
        <div className="inline-block">
          {data.map((item, index) => {
            const imageUrl = item.logoUrl || null;

            return (
              <div
                key={`${item.name}-${index}`}
                className="inline-block mx-12 svg-white"
                role="img"
                aria-label={item.name}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    title={item.name}
                    width={80}
                    height={80}
                    className="w-auto h-20 max-w-none"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(InfiniteCarousel);
