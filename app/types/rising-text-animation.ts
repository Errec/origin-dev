import { ReactNode } from 'react';

export interface UseRisingTextAnimationProps {
  delay?: number;
  duration?: number;
  speed?: number;
  stagger?: number;
  triggerOnChange?: any;
  triggerOnVisible?: boolean;
  isVisible?: boolean;
}

export interface RisingTextAnimationProps extends UseRisingTextAnimationProps {
  children: ReactNode; // The content to be animated
  className?: string; // Optional additional class names for styling
}
