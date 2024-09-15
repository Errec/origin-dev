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
}

export const RisingTextAnimation: React.FC<RisingTextAnimationProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  stagger = 0.1,
  triggerOnChange = [],
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  const animate = useCallback(() => {
    if (containerRef.current) {
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
          clearProps: 'all', // This ensures the animation can be replayed
        }
      );
    }
  }, [delay, duration, stagger]);

  // Memoize the triggerOnChange array to avoid unnecessary re-renders
  const memoizedTriggerOnChange = useMemo(
    () => triggerOnChange,
    [triggerOnChange]
  );

  useLayoutEffect(() => {
    setIsClient(true);
    animate();
  }, [animate]);

  useLayoutEffect(() => {
    if (isClient) {
      animate();
    }
  }, [isClient, animate, memoizedTriggerOnChange]);

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
