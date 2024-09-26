'use client';

import { useLoading } from '@/context/LoadingContext';
import { RisingTextAnimationProps } from '@/types/rising-text-animation';
import clsx from 'clsx';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

export const RisingTextAnimation: React.FC<RisingTextAnimationProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  speed = 1, // Default speed is 1 (normal speed)
  stagger = 0.1,
  triggerOnChange = null,
  triggerOnVisible = false,
  isVisible = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { animationReady, triggerAnimation } = useLoading();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Reset the animation and state on route change or when triggerOnChange changes
  useEffect(() => {
    setIsContentVisible(false); // Ensure it's hidden on route change or dependency change
    setHasAnimated(false);
  }, [triggerAnimation, triggerOnChange]);

  useEffect(() => {
    if (
      animationReady &&
      !hasAnimated &&
      containerRef.current &&
      (!triggerOnVisible || isVisible)
    ) {
      setHasAnimated(true);

      // Initially set the children to hidden
      gsap.set(containerRef.current.children, {
        y: 100,
        opacity: 0,
      });

      // Animate to make children visible
      const animation = gsap.to(containerRef.current.children, {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power2.out',
        onStart: () => {
          setIsContentVisible(true); // Make content visible only when animation starts
        },
      });

      // Adjust the speed using timeScale
      animation.timeScale(speed);
    }
  }, [
    animationReady,
    triggerAnimation,
    isVisible,
    duration,
    delay,
    speed, // Include 'speed' in dependencies
    stagger,
    triggerOnVisible,
    hasAnimated,
    triggerOnChange,
  ]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'overflow-hidden',
        className,
        isContentVisible ? 'visible' : 'invisible'
      )}
      style={{ minHeight: '1em' }}
    >
      {React.Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </div>
  );
};
