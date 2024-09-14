'use client';

import { Button } from '@/components/ui/Button';
import { useButtonAnimation } from '@/hooks/useButtonAnimation';
import { cn } from '@/utils';
import React, { useRef } from 'react';

interface CTAButtonProps {
  text: string;
  link?: string;
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  link,
  className,
  icon,
  type = 'button',
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const yellowBgRef = useRef<HTMLSpanElement>(null);

  useButtonAnimation(buttonRef, yellowBgRef);

  const ButtonContent = () => (
    <>
      <span
        ref={yellowBgRef}
        className="absolute -inset-x-full inset-y-0 bg-amber-400"
      ></span>
      <span className="relative z-10 flex items-center">
        {text}
        {icon && <span className="ml-2">{icon}</span>}
      </span>
    </>
  );

  return (
    <Button
      variant="default"
      size="lg"
      className={cn(
        'group relative overflow-hidden bg-white text-black text-[2.2vw] md:text-[1.5vw] lg:text-[1vw] p-0 rounded-full',
        className
      )}
      type={type}
      onClick={onClick}
      ref={buttonRef}
    >
      {link ? (
        <a
          href={link}
          className={cn(
            'relative flex items-center justify-center px-8 py-4 w-full h-full',
            className
          )}
        >
          <ButtonContent />
        </a>
      ) : (
        <span className="relative flex items-center justify-center px-8 py-4 w-full h-full">
          <ButtonContent />
        </span>
      )}
    </Button>
  );
};

export default CTAButton;
