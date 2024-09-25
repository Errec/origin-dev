'use client';

import { useLoading } from '@/context/LoadingContext';
import { RisingTextAnimationProps } from '@/types/rising-text-animation';
import clsx from 'clsx'; // Import clsx for class handling
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

export const RisingTextAnimation: React.FC<RisingTextAnimationProps> = ({
  children,
  className = '',
  ...hookProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { animationReady, triggerAnimation } = useLoading();
  const hasAnimatedRef = useRef(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Reset the animation and state on route change
  useEffect(() => {
    setIsContentVisible(false); // Ensure it's hidden on route change
    hasAnimatedRef.current = false;
  }, [triggerAnimation]);

  useEffect(() => {
    if (animationReady && !hasAnimatedRef.current && containerRef.current) {
      hasAnimatedRef.current = true;

      // Initially set the children to hidden (CSS ensures this is applied ASAP)
      gsap.set(containerRef.current.children, {
        y: 100,
        opacity: 0,
      });

      // Animate to make children visible
      gsap.to(containerRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        onStart: () => {
          setIsContentVisible(true); // Make content visible only when animation starts
        },
      });
    }
  }, [animationReady, triggerAnimation]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'overflow-hidden',
        className,
        { invisible: !isContentVisible, visible: isContentVisible } // Use Tailwind visibility
      )}
      style={{ minHeight: '1em' }}
    >
      {React.Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </div>
  );
};
