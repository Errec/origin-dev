import { useCallback, useEffect, useRef, useState } from 'react';

export function useScrollToSection(scrollTarget: string) {
  const [currentSection, setCurrentSection] = useState('top');
  const lastActionTime = useRef(Date.now());

  const scrollToSection = useCallback(
    (direction: 'up' | 'down') => {
      const now = Date.now();
      if (now - lastActionTime.current < 500) return; // Debounce actions
      lastActionTime.current = now;

      if (direction === 'down' && currentSection === 'top') {
        const targetElement = document.querySelector(scrollTarget);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth',
          });
          setCurrentSection('bottom');
        }
      } else if (direction === 'up' && currentSection === 'bottom') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setCurrentSection('top');
      }
    },
    [scrollTarget, currentSection]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollToSection(e.deltaY > 0 ? 'down' : 'up');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToSection('down');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSection('up');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollToSection]);

  return { currentSection };
}
