'use client';

import { gsap } from 'gsap';
import Link from 'next/link';
import React, { ReactNode, useEffect, useRef } from 'react';

interface AnimatedLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  className = '',
  children,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const line = lineRef.current;

    if (!link || !line) return;

    gsap.set(line, { width: '0%', left: 0 });

    const animateIn = () => {
      gsap.to(line, { width: '100%', duration: 0.5, ease: 'power2.out' });
    };

    const animateOut = () => {
      gsap.to(line, {
        width: '0%',
        duration: 0.5,
        ease: 'power2.in',
        overwrite: true,
      });
    };

    link.addEventListener('mouseenter', animateIn);
    link.addEventListener('mouseleave', animateOut);

    return () => {
      link.removeEventListener('mouseenter', animateIn);
      link.removeEventListener('mouseleave', animateOut);
    };
  }, []);

  return (
    <Link
      href={href}
      className={`relative inline-block ${className}`}
      ref={linkRef}
    >
      <span className="relative inline-block">
        {children}
        <span
          ref={lineRef}
          className="absolute bottom-0 left-0 h-[1px] bg-white"
        ></span>
      </span>
    </Link>
  );
};

export default AnimatedLink;
