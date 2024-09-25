'use client';

import LoadingAnimation from '@/components/ui/LoadingAnimation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const minimumLoadingTime = 2000;

  // Helper function to check if all images/videos on the page have finished loading
  const checkMediaAssetsLoaded = () => {
    const images = Array.from(document.images) as HTMLImageElement[]; // Get all images on the page
    const videos = Array.from(
      document.getElementsByTagName('video')
    ) as HTMLVideoElement[]; // Get all videos

    const allImagesLoaded = images.every(
      (img) => img.complete && img.naturalWidth > 0
    );
    const allVideosLoaded = videos.every((video) => video.readyState >= 3);

    return allImagesLoaded && allVideosLoaded;
  };

  useEffect(() => {
    setLoading(true);
    setMinLoadingComplete(false);
    setAssetsLoaded(false);

    // Minimum loading duration
    const minLoadingTimer = setTimeout(() => {
      setMinLoadingComplete(true);
    }, minimumLoadingTime);

    const handleAssetLoaded = () => {
      const images = Array.from(document.images) as HTMLImageElement[];
      const videos = Array.from(
        document.getElementsByTagName('video')
      ) as HTMLVideoElement[];

      let loadedAssetsCount = 0;
      const totalAssets = images.length + videos.length;

      const handleSingleAssetLoaded = () => {
        loadedAssetsCount += 1;
        if (loadedAssetsCount === totalAssets) {
          setAssetsLoaded(true); // All assets have loaded
        }
      };

      // Check images
      images.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
          handleSingleAssetLoaded();
        } else {
          img.onload = handleSingleAssetLoaded;
          img.onerror = handleSingleAssetLoaded; // In case of an error, treat it as loaded
        }
      });

      // Check videos
      videos.forEach((video) => {
        if (video.readyState >= 3) {
          handleSingleAssetLoaded();
        } else {
          video.onloadeddata = handleSingleAssetLoaded;
          video.onerror = handleSingleAssetLoaded; // In case of video error, treat as loaded
          video.onabort = handleSingleAssetLoaded; // Handle video abort gracefully
        }
      });
    };

    const handlePageLoad = () => {
      if (checkMediaAssetsLoaded()) {
        setAssetsLoaded(true);
      } else {
        handleAssetLoaded();
      }
    };

    // Monitor DOM changes for media elements being added/removed
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'childList' &&
          (mutation.addedNodes.length || mutation.removedNodes.length)
        ) {
          handleAssetLoaded();
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState === 'complete') {
      handlePageLoad(); // If the page is already loaded, check the assets
    } else {
      window.addEventListener('load', handlePageLoad); // Wait for the load event
    }

    return () => {
      clearTimeout(minLoadingTimer);
      window.removeEventListener('load', handlePageLoad);
      observer.disconnect(); // Stop observing DOM mutations
    };
  }, [pathname]);

  const showLoading = loading && (!minLoadingComplete || !assetsLoaded);

  useEffect(() => {
    if (minLoadingComplete && assetsLoaded) {
      setLoading(false); // Only stop loading when both conditions are met
    }
  }, [minLoadingComplete, assetsLoaded]);

  return (
    <>
      {showLoading && <LoadingAnimation />} {/* Show loading animation */}
      {!showLoading && children} {/* Show content once loading is complete */}
    </>
  );
}
