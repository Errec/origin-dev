'use client';

import Navbar from '@/components/common/Navbar';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import { usePathname } from 'next/navigation';
import React, { useRef, useState } from 'react';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';

  const isHeaderVisible = useHeaderScroll(headerRef, undefined, {
    disableHideOnScroll: isAboutPage,
  });

  const headerClass =
    isAboutPage || isHeaderVisible
      ? 'opacity-100'
      : 'opacity-0 pointer-events-none';

  return (
    <header
      ref={headerRef}
      className={`z-10 fixed top-0 left-0 right-0 h-18 py-4 px-4 bg-transparent shadow-lg backdrop-blur-sm transition-opacity duration-300 ease-in-out ${headerClass}`}
    >
      <Navbar items={navItems} headerVisible={true} />
    </header>
  );
}
