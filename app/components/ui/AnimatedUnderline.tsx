'use client';
import { gsap } from 'gsap';
import Link from 'next/link';
import React, { ReactNode, useEffect, useRef } from 'react';

interface AnimatedUnderlineProps {
  href?: string;
  className?: string;
  children: ReactNode;
}

const AnimatedUnderline: React.FC<AnimatedUnderlineProps> = ({
  href,
  className = '',
  children,
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const line = lineRef.current;

    if (!element || !line) return;

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

    element.addEventListener('mouseenter', expand);
    element.addEventListener('mouseleave', shrink);

    return () => {
      element.removeEventListener('mouseenter', expand);
      element.removeEventListener('mouseleave', shrink);
    };
  }, []);

  const content = (
    <span className="relative inline-block w-full" ref={elementRef}>
      {children}
      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
        aria-hidden="true"
      ></span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={`relative inline-block ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <span className={`relative inline-block ${className}`}>{content}</span>
  );
};

export default AnimatedUnderline;
