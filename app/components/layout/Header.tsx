'use client';

import Navbar from '@/components/common/Navbar';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

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
  }, [lastScrollY]);

  return (
    <header
      ref={headerRef}
      className="z-10 fixed top-0 left-0 right-0 h-18 py-4 px-4 bg-transparent shadow-lg backdrop-blur-sm transition-all duration-500 ease-in-out"
    >
      <Navbar />
    </header>
  );
}
