'use client';

import React, { useEffect, useRef } from 'react';

export interface VideoPlayerProps {
  src: string;
  isPlaying?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  isPlaying = true,
  autoPlay = true,
  loop = true,
  muted = true,
  className,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isPlaying) {
        videoElement
          .play()
          .catch((error) => console.error('Error playing video:', error));
      } else {
        videoElement.pause();
      }
    }
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      className={className}
      style={style}
    />
  );
};

export default VideoPlayer;
