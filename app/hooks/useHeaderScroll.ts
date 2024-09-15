import gsap from 'gsap';
import { RefObject, useEffect, useState } from 'react';

export function useHeaderScroll(headerRef: RefObject<HTMLElement>) {
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (currentScrollY + windowHeight >= documentHeight - 50) {
          // Near the bottom of the page, show the header
          gsap.to(headerRef.current, {
            y: '0%',
            duration: 0,
            ease: 'power2.out',
          });
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down, hide header
          gsap.to(headerRef.current, {
            y: '-100%',
            duration: 0,
            ease: 'power2.out',
          });
        } else {
          // Scrolling up, show header
          gsap.to(headerRef.current, {
            y: '0%',
            duration: 0,
            ease: 'power2.out',
          });
        }

        setLastScrollY(currentScrollY);
      };

      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
          gsap.to(headerRef.current, {
            y: '-100%',
            duration: 0,
            ease: 'power2.out',
          });
        } else if (event.key === 'ArrowUp') {
          gsap.to(headerRef.current, {
            y: '0%',
            duration: 0,
            ease: 'power2.out',
          });
        }
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [lastScrollY, headerRef]);
}
