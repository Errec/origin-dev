'use client';

import React, { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  isComplete: boolean;
  isRouteChange: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  isComplete,
  isRouteChange,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 15);

    return () => clearInterval(timer);
  }, []);

  const animationClass = isComplete
    ? '-translate-y-full'
    : isRouteChange
      ? 'translate-y-0'
      : '';

  return (
    <div
      className={`fixed inset-0 z-50 bg-neutral-500 transition-transform duration-500 ease-in-out ${animationClass}`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative">
          <h1 className="text-5xl font-bold mb-7 text-black">OriginDev</h1>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `inset(${100 - progress}% 0 0 0)`,
            }}
          >
            <h1 className="text-5xl font-bold text-neutral-300">OriginDev</h1>
          </div>
        </div>
        <div className="w-52 flex items-center">
          <div className="w-full h-0.5 bg-neutral-600 relative mr-2">
            <div
              className="h-full bg-neutral-300 absolute left-0 top-0"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-neutral-300 text-sm">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
