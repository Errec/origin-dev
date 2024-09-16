'use client';

import gsap from 'gsap';
import React, {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface RisingTextAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnChange?: any[]; // Dependencies that trigger the animation when changed
  className?: string;
  triggerOnVisible?: boolean; // New optional prop to enable visibility-based triggering
  isVisible?: boolean; // New optional prop to control visibility-based animation
}

export const RisingTextAnimation: React.FC<RisingTextAnimationProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  stagger = 0.1,
  triggerOnChange = [],
  className = '',
  triggerOnVisible = false,
  isVisible = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animate = useCallback(() => {
    if (containerRef.current && (!hasAnimated || !triggerOnVisible)) {
      gsap.fromTo(
        containerRef.current.children,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: 'power2.out',
          clearProps: 'all',
          onComplete: () => setHasAnimated(true),
        }
      );
    }
  }, [delay, duration, stagger, hasAnimated, triggerOnVisible]);

  const resetAnimation = useCallback(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current.children, {
        yPercent: 0,
        opacity: 1,
      });
    }
  }, []);

  // Memoize the triggerOnChange array to avoid unnecessary re-renders
  const memoizedTriggerOnChange = useMemo(
    () => triggerOnChange,
    [triggerOnChange]
  );

  useLayoutEffect(() => {
    setIsClient(true);
    if (!triggerOnVisible) {
      animate();
    }
  }, [animate, triggerOnVisible]);

  useLayoutEffect(() => {
    if (isClient && triggerOnVisible) {
      if (isVisible) {
        animate();
      } else {
        setHasAnimated(false);
        resetAnimation();
      }
    }
  }, [
    isClient,
    animate,
    resetAnimation,
    isVisible,
    triggerOnVisible,
    memoizedTriggerOnChange,
  ]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ visibility: isClient ? 'visible' : 'hidden', minHeight: '1em' }}
    >
      {React.Children.map(children, (child) => (
        <div style={{ opacity: isClient ? 1 : 0 }}>{child}</div>
      ))}
    </div>
  );
};
