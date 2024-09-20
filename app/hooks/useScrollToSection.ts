import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MutableRefObject, useEffect } from 'react';

gsap.registerPlugin(ScrollToPlugin);

export function useScrollToSection(
  scrollTarget: string,
  hasScrolledRef: MutableRefObject<boolean>
) {
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolledRef.current && window.scrollY > 0) {
        hasScrolledRef.current = true;
        if (scrollTarget) {
          gsap.to(window, {
            duration: 1,
            scrollTo: scrollTarget, // Scroll to the selector
            ease: 'power2.inOut',
          });
        }
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollTarget, hasScrolledRef]);
}
