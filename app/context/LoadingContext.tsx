'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

// Constants
const ANIMATION_DELAY_MS = 150;

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  animationReady: boolean;
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

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isLoading) {
      // Set a timer to trigger animation after ANIMATION_DELAY_MS
      timer = setTimeout(() => {
        setAnimationReady(true);
      }, ANIMATION_DELAY_MS);
    } else {
      // Reset animationReady when loading starts again
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
