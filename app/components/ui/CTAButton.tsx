'use client';

import { Button } from '@/components/ui/Button';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

interface CTAButtonProps {
  text: string;
  link: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, link }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const yellowBgRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const yellowBg = yellowBgRef.current;

    if (!button || !yellowBg) return;

    const onEnter = () => {
      gsap.to(yellowBg, {
        yPercent: -100,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    };

    const onLeave = () => {
      gsap.set(yellowBg, { yPercent: 100 });
      gsap.to(yellowBg, { yPercent: 0, duration: 0.3, ease: 'power2.inOut' });
    };

    button.addEventListener('mouseenter', onEnter);
    button.addEventListener('mouseleave', onLeave);

    return () => {
      button.removeEventListener('mouseenter', onEnter);
      button.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <Button
      variant="default"
      size="lg"
      className="group relative overflow-hidden bg-white text-black text-[2.2vw] md:text-[1.5vw] lg:text-[1vw] p-0 rounded-full"
      asChild
      ariaLabel={text}
    >
      <a
        ref={buttonRef}
        href={link}
        className="relative flex items-center justify-center px-8 py-4"
      >
        <span
          ref={yellowBgRef}
          className="absolute inset-0 bg-amber-400"
        ></span>
        <span className="relative z-10 flex items-center">
          {text}
          <ArrowRight className="ml-2 h-5 w-5" />
        </span>
      </a>
    </Button>
  );
};

export default CTAButton;
