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

    const resetLine = () => {
      gsap.set(line, { clipPath: 'inset(0 100% 0 0)', width: '100%' });
    };

    resetLine();

    const expand = () => {
      resetLine();
      gsap.to(line, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const shrink = () => {
      gsap.to(line, {
        clipPath: 'inset(0 0% 0 100%)',
        duration: 0.2,
        ease: 'power2.in',
      });
    };

    link.addEventListener('mouseenter', expand);
    link.addEventListener('mouseleave', shrink);

    return () => {
      link.removeEventListener('mouseenter', expand);
      link.removeEventListener('mouseleave', shrink);
    };
  }, []);

  return (
    <Link href={href} className={`relative inline-block ${className}`}>
      <span className="relative inline-block" ref={linkRef}>
        {children}
        <span
          ref={lineRef}
          className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
          aria-hidden="true"
        ></span>
      </span>
    </Link>
  );
};

export default AnimatedLink;
