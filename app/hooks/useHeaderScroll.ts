'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

interface UseHeaderScrollOptions {
  disableHideOnScroll?: boolean;
}

export function useHeaderScroll(
  headerRef: RefObject<HTMLElement>,
  onVisibilityChange?: (visible: boolean) => void,
  options: UseHeaderScrollOptions = {}
) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (!headerRef.current || options.disableHideOnScroll) return;

      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      let newIsVisible = isVisible;

      if (currentScrollY + windowHeight >= documentHeight - 50) {
        // Near the bottom of the page, show the header
        if (!isVisible) {
          newIsVisible = true;
          setIsVisible(newIsVisible);
          onVisibilityChange?.(newIsVisible);
        }
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down, hide header
        if (isVisible) {
          newIsVisible = false;
          setIsVisible(newIsVisible);
          onVisibilityChange?.(newIsVisible);
        }
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up, show header
        if (!isVisible) {
          newIsVisible = true;
          setIsVisible(newIsVisible);
          onVisibilityChange?.(newIsVisible);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Use requestAnimationFrame for smoother performance
    let rafId: number;
    const handleScrollWrapper = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScrollWrapper, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollWrapper);
      cancelAnimationFrame(rafId);
    };
  }, [headerRef, isVisible, onVisibilityChange, options.disableHideOnScroll]);

  return isVisible;
}
