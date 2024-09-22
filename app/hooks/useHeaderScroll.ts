import gsap from 'gsap';
import { RefObject, useEffect, useState } from 'react';

interface UseHeaderScrollOptions {
  disableHideOnScroll?: boolean;
}

export function useHeaderScroll(
  headerRef: RefObject<HTMLElement>,
  onVisibilityChange?: (visible: boolean) => void,
  options: UseHeaderScrollOptions = {}
) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !options.disableHideOnScroll) {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        let newIsVisible = true;

        if (currentScrollY + windowHeight >= documentHeight - 50) {
          // Near the bottom of the page, show the header
          gsap.to(headerRef.current, {
            y: '0%',
            duration: 0.3,
            ease: 'power2.out',
          });
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down, hide header
          gsap.to(headerRef.current, {
            y: '-100%',
            duration: 0.3,
            ease: 'power2.out',
          });
          newIsVisible = false;
        } else {
          // Scrolling up, show header
          gsap.to(headerRef.current, {
            y: '0%',
            duration: 0.3,
            ease: 'power2.out',
          });
        }

        setLastScrollY(currentScrollY);
        setIsVisible(newIsVisible);
        onVisibilityChange?.(newIsVisible);
      };

      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
          gsap.to(headerRef.current, {
            y: '-100%',
            duration: 0.3,
            ease: 'power2.out',
          });
          setIsVisible(false);
          onVisibilityChange?.(false);
        } else if (event.key === 'ArrowUp') {
          gsap.to(headerRef.current, {
            y: '0%',
            duration: 0.3,
            ease: 'power2.out',
          });
          setIsVisible(true);
          onVisibilityChange?.(true);
        }
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [lastScrollY, headerRef, onVisibilityChange, options.disableHideOnScroll]);

  return isVisible;
}
