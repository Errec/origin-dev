'use client';

import LoadingAnimation from '@/components/ui/LoadingAnimation';
import { useLoading } from '@/context/LoadingContext';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const MINIMUM_LOADING_TIME = 1500;

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoading();
  const [showLoading, setShowLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isRouteChange, setIsRouteChange] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setShowLoading(true);
    setIsComplete(false);
    setIsRouteChange(pathname !== '/');

    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
    }, MINIMUM_LOADING_TIME);

    return () => clearTimeout(timer);
  }, [pathname, setIsLoading]);

  useEffect(() => {
    if (isComplete) {
      const hideTimer = setTimeout(() => {
        setShowLoading(false);
      }, 500); // Allow time for the curtain animation

      return () => clearTimeout(hideTimer);
    }
  }, [isComplete]);

  return (
    <>
      {showLoading && (
        <LoadingAnimation
          isComplete={isComplete}
          isRouteChange={isRouteChange}
        />
      )}
      {children}
    </>
  );
}
