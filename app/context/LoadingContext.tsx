'use client';

import { usePathname } from 'next/navigation';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const ANIMATION_DELAY_MS = 500;

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  animationReady: boolean;
  triggerAnimation: number;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationReady, setAnimationReady] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    setAnimationReady(false);
    setTriggerAnimation((prev) => prev + 1);
  }, [pathname]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isLoading) {
      timer = setTimeout(() => {
        setAnimationReady(true);
      }, ANIMATION_DELAY_MS);
    } else {
      setAnimationReady(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  const value: LoadingContextType = {
    isLoading,
    setIsLoading,
    animationReady,
    triggerAnimation,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
