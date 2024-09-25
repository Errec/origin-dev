'use client';

import LoadingAnimation from '@/components/ui/LoadingAnimation';
import { useLoading } from '@/context/LoadingContext';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const MINIMUM_LOADING_TIME = 1500;
const MAXIMUM_LOADING_TIME = 5000;

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoading();
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const checkMediaAssetsLoaded = () => {
    const images = Array.from(document.images) as HTMLImageElement[];
    const videos = Array.from(
      document.getElementsByTagName('video')
    ) as HTMLVideoElement[];

    const allImagesLoaded = images.every(
      (img) => img.complete && img.naturalWidth > 0
    );
    const allVideosLoaded = videos.every((video) => video.readyState >= 3);

    return allImagesLoaded && allVideosLoaded;
  };

  useEffect(() => {
    setIsLoading(true);
    setMinLoadingComplete(false);
    setAssetsLoaded(false);

    const minLoadingTimer = setTimeout(() => {
      setMinLoadingComplete(true);
    }, MINIMUM_LOADING_TIME);

    const maxLoadingTimer = setTimeout(() => {
      setAssetsLoaded(true);
    }, MAXIMUM_LOADING_TIME);

    const handleAssetLoaded = () => {
      if (checkMediaAssetsLoaded()) {
        setAssetsLoaded(true);
      }
    };

    const observer = new MutationObserver(handleAssetLoaded);
    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState === 'complete') {
      handleAssetLoaded();
    } else {
      window.addEventListener('load', handleAssetLoaded);
    }

    return () => {
      clearTimeout(minLoadingTimer);
      clearTimeout(maxLoadingTimer);
      window.removeEventListener('load', handleAssetLoaded);
      observer.disconnect();
    };
  }, [pathname, setIsLoading]);

  useEffect(() => {
    if (minLoadingComplete && assetsLoaded) {
      setIsLoading(false);
    }
  }, [minLoadingComplete, assetsLoaded, setIsLoading]);

  return <>{isLoading ? <LoadingAnimation /> : children}</>;
}
