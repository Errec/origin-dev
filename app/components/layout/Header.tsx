'use client';

import Navbar from '@/components/common/Navbar';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import { useSelectedLayoutSegment } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const activeSegment = useSelectedLayoutSegment();
  const isAnimated = activeSegment === 'about';

  const isHeaderVisible = useHeaderScroll(headerRef, undefined, {
    disableHideOnScroll: isAnimated,
  });

  const [headerStyle, setHeaderStyle] = useState({
    transform: 'translateY(0)',
    opacity: 1,
  });

  useEffect(() => {
    if (isHeaderVisible) {
      setHeaderStyle({
        transform: 'translateY(0)',
        opacity: 1,
      });
    } else {
      setHeaderStyle({
        transform: 'translateY(-100%)',
        opacity: 0,
      });
    }
  }, [isHeaderVisible]);

  return (
    <>
      <div className="h-18" /> {/* Placeholder to preserve layout */}
      <header
        ref={headerRef}
        className={`z-50 fixed top-0 left-0 right-0 h-18 py-4 px-4 bg-transparent shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out ${
          isAnimated ? 'pointer-events-auto' : ''
        }`}
        style={headerStyle}
      >
        <Navbar items={navItems} headerVisible={isHeaderVisible} />
      </header>
    </>
  );
}
