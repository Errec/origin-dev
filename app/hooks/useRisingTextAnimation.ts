import { useLoading } from '@/context/LoadingContext';
import { UseRisingTextAnimationProps } from '@/types/rising-text-animation';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useRisingTextAnimation = ({
  delay = 0,
  duration = 0.5,
  stagger = 0.1,
  triggerOnVisible = false,
  isVisible: propIsVisible = true,
}: UseRisingTextAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { animationReady } = useLoading();
  const pathname = usePathname();

  const animate = useCallback(() => {
    const elements = containerRef.current?.children;
    if (elements && animationReady) {
      gsap.set(elements, { y: 100, opacity: 0 });

      gsap.to(elements, {
        y: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: 'power2.out',
        onStart: () => setIsVisible(true),
      });
    }
  }, [delay, duration, stagger, animationReady]);

  useEffect(() => {
    setIsVisible(false); // Hide content immediately on route change

    if (!triggerOnVisible || (triggerOnVisible && propIsVisible)) {
      animate();
    }
  }, [animate, triggerOnVisible, propIsVisible, pathname]);

  return { containerRef, isVisible };
};
