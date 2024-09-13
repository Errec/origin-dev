import { gsap } from 'gsap';
import { RefObject, useEffect } from 'react';

export const useButtonAnimation = (
  buttonRef: RefObject<HTMLElement>,
  yellowBgRef: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const button = buttonRef.current;
    const yellowBg = yellowBgRef.current;

    if (!button || !yellowBg) return;

    const onEnter = () => {
      gsap.to(yellowBg, {
        yPercent: -100,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    };

    const onLeave = () => {
      gsap.set(yellowBg, { yPercent: 100 });
      gsap.to(yellowBg, { yPercent: 0, duration: 0.3, ease: 'power2.inOut' });
    };

    button.addEventListener('mouseenter', onEnter);
    button.addEventListener('mouseleave', onLeave);

    return () => {
      button.removeEventListener('mouseenter', onEnter);
      button.removeEventListener('mouseleave', onLeave);
    };
  }, [buttonRef, yellowBgRef]);
};
