import { UseAnimatedUnderlineProps } from '@/types/animated-underline';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export const useAnimatedUnderline = ({
  disabled = false,
}: UseAnimatedUnderlineProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (disabled) return;

    const container = containerRef.current;
    const line = lineRef.current;

    if (!container || !line) return;

    const resetLine = () => {
      gsap.set(line, { clipPath: 'inset(0 100% 0 0)', width: '100%' });
    };

    resetLine();

    const expand = () => {
      resetLine();
      gsap.to(line, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const shrink = () => {
      gsap.to(line, {
        clipPath: 'inset(0 0% 0 100%)',
        duration: 0.2,
        ease: 'power2.in',
      });
    };

    container.addEventListener('mouseenter', expand);
    container.addEventListener('mouseleave', shrink);

    return () => {
      container.removeEventListener('mouseenter', expand);
      container.removeEventListener('mouseleave', shrink);
    };
  }, [disabled]);

  return { containerRef, lineRef };
};
