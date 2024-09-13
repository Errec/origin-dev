'use client';

import { Button } from '@/components/ui/Button';
import { useButtonAnimation } from '@/hooks/useButtonAnimation';
import { cn } from '@/utils';
import React, { useRef } from 'react';

interface CTAButtonProps {
  text: string;
  link: string;
  className?: string;
  icon?: React.ReactNode;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  link,
  className,
  icon,
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const yellowBgRef = useRef<HTMLSpanElement>(null);

  useButtonAnimation(buttonRef, yellowBgRef);

  return (
    <Button
      variant="default"
      size="lg"
      className={cn(
        'group relative overflow-hidden bg-white text-black text-[2.2vw] md:text-[1.5vw] lg:text-[1vw] p-0 rounded-full',
        className
      )}
      asChild
      ariaLabel={text}
    >
      <a
        ref={buttonRef}
        href={link}
        className={cn(
          'relative flex items-center justify-center px-8 py-4',
          className
        )}
      >
        <span
          ref={yellowBgRef}
          className="absolute inset-0 bg-amber-400"
        ></span>
        <span className="relative z-10 flex items-center">
          {text}
          {icon && <span className="ml-2">{icon}</span>}
        </span>
      </a>
    </Button>
  );
};

export default CTAButton;
