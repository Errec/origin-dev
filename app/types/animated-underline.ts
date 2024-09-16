import { ReactNode } from 'react';

export interface UseAnimatedUnderlineProps {
  disabled?: boolean;
}

export interface AnimatedUnderlineProps extends UseAnimatedUnderlineProps {
  children: ReactNode;
  className?: string;
}
