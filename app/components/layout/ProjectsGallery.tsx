'use client';
import { urlFor } from '@/lib/sanity-client';
import type { ProjectsPage as ProjectsPageType } from '@/types/projects';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const MIN_SCALE = 0.6;
const MAX_SCALE = 1.3;
const MOVEMENT_RANGE = 20; // Percentage of movement range

export default function ProjectsGallery({
  projectsPage,
}: {
  projectsPage: ProjectsPageType;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;
    const container = galleryRef.current;
    const images = container.querySelectorAll('.project-image-wrapper');

    images.forEach((img) => {
      const duration = gsap.utils.random(20, 30);
      const startX = gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE);
      const startY = gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE);
      const startScale = gsap.utils.random(MIN_SCALE, MAX_SCALE);

      gsap.set(img, { x: startX + '%', y: startY + '%', scale: startScale });

      gsap.to(img, {
        x: () => `${gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE)}%`,
        y: () => `${gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE)}%`,
        scale: () => gsap.utils.random(MIN_SCALE, MAX_SCALE),
        rotation: () => gsap.utils.random(-5, 5),
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        onUpdate: () => updateImageStyle(img as HTMLElement),
      });
    });

    return () => {
      gsap.killTweensOf(images);
    };
  }, []);

  const updateImageStyle = (img: HTMLElement) => {
    const scale = gsap.getProperty(img, 'scale') as number;
    const normalizedScale = (scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);
    const blur = (1 - normalizedScale) * 3; // 0 to 3px blur
    const zIndex = Math.round(normalizedScale * 100);

    const imageElement = img.querySelector('.project-image') as HTMLElement;
    if (imageElement) {
      imageElement.style.filter = `blur(${blur}px)`;
    }
    img.style.zIndex = zIndex.toString();
  };

  return (
    <div
      ref={galleryRef}
      className="fixed inset-0 overflow-hidden bg-black"
      style={{ perspective: '1000px' }}
    >
      {projectsPage.projects.map((project, index) => (
        <div
          key={index}
          className="project-image-wrapper absolute w-1/3 h-1/3 flex flex-col items-start justify-center"
          style={{
            left: `${(index % 3) * 33.33}%`,
            top: `${Math.floor(index / 3) * 33.33}%`,
          }}
        >
          <div className="relative w-full h-full p-4">
            <div className="project-image absolute inset-0">
              <Image
                src={urlFor(project.photo).url()}
                alt={project.subtitle}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <p className="text-white text-sm mt-2 text-left w-full px-2">
            {project.subtitle}
          </p>
        </div>
      ))}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 1000 }}
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
          {projectsPage.pageSubtitle}
        </h1>
      </div>
    </div>
  );
}
