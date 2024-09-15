'use client';

import Navbar from '@/components/common/Navbar';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import React, { useRef } from 'react';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  useHeaderScroll(headerRef);

  return (
    <header
      ref={headerRef}
      className="z-10 fixed top-0 left-0 right-0 h-18 py-4 px-4 bg-transparent shadow-lg backdrop-blur-sm transition-all duration-500 ease-in-out"
    >
      <Navbar />
    </header>
  );
}
