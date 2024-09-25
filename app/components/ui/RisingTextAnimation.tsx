import { useLoading } from '@/context/LoadingContext';
import { useRisingTextAnimation } from '@/hooks/useRisingTextAnimation';
import { RisingTextAnimationProps } from '@/types/rising-text-animation';
import React from 'react';

export const RisingTextAnimation: React.FC<RisingTextAnimationProps> = ({
  children,
  className = '',
  ...hookProps
}) => {
  const { containerRef, isClient } = useRisingTextAnimation(hookProps);
  const { animationReady } = useLoading();

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ visibility: isClient && animationReady ? 'visible' : 'hidden', minHeight: '1em' }}
    >
      {React.Children.map(children, (child) => (
        <div style={{ opacity: isClient && animationReady ? 1 : 0 }}>{child}</div>
      ))}
    </div>
  );
};