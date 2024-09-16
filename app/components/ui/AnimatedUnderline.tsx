'use client';

import { useAnimatedUnderline } from '@/hooks/useAnimatedUnderline';
import { AnimatedUnderlineProps } from '@/types/animated-underline';
import React from 'react';

const AnimatedUnderline: React.FC<AnimatedUnderlineProps> = ({
  children,
  className = '',
  disabled = false,
}) => {
  const { containerRef, lineRef } = useAnimatedUnderline({ disabled });

  return (
    <span className={`relative inline-block ${className}`} ref={containerRef}>
      {children}
      {!disabled && (
        <span
          ref={lineRef}
          className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
          aria-hidden="true"
        ></span>
      )}
    </span>
  );
};

export default AnimatedUnderline;
