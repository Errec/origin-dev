import { ReactNode } from 'react';

export interface UseRisingTextAnimationProps {
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnChange?: any[];
  triggerOnVisible?: boolean;
  isVisible?: boolean;
}

export interface RisingTextAnimationProps extends UseRisingTextAnimationProps {
  children: ReactNode;
  className?: string;
}
