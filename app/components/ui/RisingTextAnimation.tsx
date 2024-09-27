'use client';

import { useLoading } from '@/context/LoadingContext';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface RisingTextAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export const RisingTextAnimation: React.FC<RisingTextAnimationProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  stagger = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { animationReady } = useLoading();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const elements = containerRef.current?.children;
    if (elements && animationReady) {
      setIsVisible(false);
      gsap.set(elements, { y: 100, opacity: 0 });

      gsap.to(elements, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power2.out',
        onStart: () => setIsVisible(true),
      });
    }

    return () => {
      if (elements) {
        gsap.killTweensOf(elements);
      }
    };
  }, [animationReady, pathname, duration, delay, stagger]);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        'overflow-hidden',
        isVisible ? 'visible' : 'invisible',
        className
      )}
    >
      {children}
    </div>
  );
};
