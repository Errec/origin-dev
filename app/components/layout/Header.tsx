'use client';

import Navbar from '@/components/common/Navbar';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import React, { useRef, useState } from 'react';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useHeaderScroll(headerRef, (visible) => setIsHeaderVisible(visible));

  return (
    <header
      ref={headerRef}
      className="z-10 fixed top-0 left-0 right-0 h-18 py-4 px-4 bg-transparent shadow-lg backdrop-blur-sm transition-all duration-500 ease-in-out"
    >
      <Navbar items={navItems} headerVisible={isHeaderVisible} />
    </header>
  );
}
