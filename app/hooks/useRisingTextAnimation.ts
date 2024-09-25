import { useLoading } from '@/context/LoadingContext';
import { UseRisingTextAnimationProps } from '@/types/rising-text-animation';
import gsap from 'gsap';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

export const useRisingTextAnimation = ({
  delay = 0,
  duration = 0.5,
  stagger = 0.1,
  triggerOnChange = [],
  triggerOnVisible = false,
  isVisible = true,
}: UseRisingTextAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { animationReady } = useLoading();

  const animate = useCallback(() => {
    if (
      containerRef.current &&
      (!hasAnimated || !triggerOnVisible) &&
      animationReady
    ) {
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
  }, [delay, duration, stagger, hasAnimated, triggerOnVisible, animationReady]);

  const resetAnimation = useCallback(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current.children, {
        yPercent: 0,
        opacity: 1,
      });
    }
  }, []);

  const memoizedTriggerOnChange = useMemo(
    () => triggerOnChange,
    [triggerOnChange]
  );

  useLayoutEffect(() => {
    setIsClient(true);
    if (!triggerOnVisible && animationReady) {
      animate();
    }
  }, [animate, triggerOnVisible, animationReady]);

  useLayoutEffect(() => {
    if (isClient && triggerOnVisible && animationReady) {
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
    animationReady,
  ]);

  return { containerRef, isClient };
};
