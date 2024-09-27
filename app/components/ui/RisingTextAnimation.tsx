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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setIsAnimating(true);

    const elements = containerRef.current?.children;

    if (elements && animationReady) {
      gsap.set(elements, { y: 100, opacity: 0 });

      gsap.to(elements, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        onStart: () => setIsVisible(true),
        onComplete: () => setIsAnimating(false),
      });
    }

    return () => {
      if (elements) {
        gsap.killTweensOf(elements);
      }
    };
  }, [animationReady, pathname, duration, delay, stagger]);

  const visibilityClass = isVisible || isAnimating ? 'visible' : 'invisible';

  return (
    <div
      ref={containerRef}
      className={twMerge('overflow-hidden', visibilityClass, className)}
    >
      {children}
    </div>
  );
};
