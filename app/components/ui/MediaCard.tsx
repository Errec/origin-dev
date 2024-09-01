'use client';

import { ProjectsSection } from '@/types';
import { gsap } from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type Project = ProjectsSection['projects'][number];

const MediaCard: React.FC<Project> = ({ title, subtitle, image, hoverVideo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && textContainerRef.current && titleRef.current && subtitleRef.current && bgRef.current && videoRef.current) {
      gsap.set(subtitleRef.current, { yPercent: 100, opacity: 0 });
      gsap.set(bgRef.current, { opacity: 0 });
      gsap.set(videoRef.current, { opacity: 0 });
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.error('Error playing video:', error));
    }

    gsap.to(imageRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
    gsap.to(videoRef.current, { opacity: 1, duration: 0.6, ease: "power2.inOut" });
    gsap.to(titleRef.current, { yPercent: -100, duration: 0.4, ease: "power2.out", backgroundColor: "rgba(0, 0, 0, 0.0)" });
    gsap.to(subtitleRef.current, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(bgRef.current, { opacity: 1, duration: 0.4, ease: "power2.inOut", delay: 0.2 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    gsap.to(titleRef.current, { yPercent: 0, duration: 0.4, ease: "power2.out", backgroundColor: "rgba(0, 0, 0, 0.6)" });
    gsap.to(subtitleRef.current, { yPercent: 100, opacity: 0, duration: 0.4, ease: "power2.out", onStart: () => {
      gsap.to(subtitleRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
    }});
    gsap.to(imageRef.current, { opacity: 1, duration: 0.6, ease: "power2.inOut" });
    gsap.to(videoRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
    gsap.to(bgRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-full aspect-[472/511] overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0">
        <Image
          ref={imageRef as any}
          src={image.asset.url}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-600 ease-in-out"
        />
        {hoverVideo && (
          <video
            ref={videoRef}
            src={hoverVideo.asset.url}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out opacity-0"
          />
        )}
      </div>
      <div 
        ref={bgRef}
        className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 transition-opacity duration-400 ease-in-out opacity-0"
        style={{ height: '20%' }}
      ></div>
      <div 
        ref={textContainerRef}
        className="absolute inset-x-0 bottom-0 px-2 sm:px-4 flex flex-col justify-end items-center"
        style={{ height: '20%' }}
      >
        <h3 
          ref={titleRef} 
          className="text-white bg-black bg-opacity-60 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-center leading-tight p-1 sm:p-2 mb-2 sm:mb-3 md:mb-4 lg:mb-5 w-full transition-transform duration-400 ease-out"
        >
          {title}
        </h3>
        <p 
          ref={subtitleRef} 
          className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-center w-full absolute left-0 right-0 bottom-1 sm:bottom-2 opacity-0 px-2 sm:px-4 transition-all duration-400 ease-out"
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default MediaCard;
