'use client';
import { urlFor } from '@/lib/sanity-client';
import type { ProjectsPage as ProjectsPageType } from '@/types/projects';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const MIN_SCALE = 0.7;
const MAX_SCALE = 1.2;
const MOVEMENT_RANGE = 15; // Reduced percentage of movement range

export default function ProjectsGallery({
  projectsPage,
}: {
  projectsPage: ProjectsPageType;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    if (!galleryRef.current) return;
    const container = galleryRef.current;
    const images = container.querySelectorAll('.project-image-wrapper');

    images.forEach((img, index) => {
      const duration = gsap.utils.random(20, 30);
      const startX = gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE);
      const startY = gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE);
      const startScale = gsap.utils.random(MIN_SCALE, MAX_SCALE);

      gsap.set(img, {
        x: startX + '%',
        y: startY + '%',
        scale: startScale,
        zIndex: 10 + index,
      });

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(img, {
        x: () => `${gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE)}%`,
        y: () => `${gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE)}%`,
        scale: () => gsap.utils.random(MIN_SCALE, MAX_SCALE),
        rotation: () => gsap.utils.random(-3, 3),
        duration: duration,
        ease: 'sine.inOut',
        onUpdate: () => updateImageStyle(img as HTMLElement, index),
      });

      (img as any).timeline = tl;
    });

    return () => {
      images.forEach((img) => {
        if ((img as any).timeline) {
          (img as any).timeline.kill();
        }
      });
    };
  }, []);

  const updateImageStyle = (img: HTMLElement, index: number) => {
    const scale = gsap.getProperty(img, 'scale') as number;
    const normalizedScale = (scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);
    const blur = (1 - normalizedScale) * 2; // 0 to 2px blur

    const imageElement = img.querySelector('.project-image') as HTMLElement;
    if (imageElement) {
      imageElement.style.filter = `blur(${blur}px)`;
    }
    img.style.zIndex = `${10 + index + Math.round(normalizedScale * 10)}`;
  };

  const handleImageHover = (index: number) => {
    setHoveredProject(index);
    const img = galleryRef.current?.querySelectorAll('.project-image-wrapper')[
      index
    ];
    if (img) {
      (img as any).timeline.pause();
      gsap.to(img, {
        scale: MAX_SCALE,
        zIndex: 100,
        duration: 0.3,
        x: 0,
        y: 0,
        rotation: 0,
      });
    }
  };

  const handleImageLeave = (index: number) => {
    setHoveredProject(null);
    const img = galleryRef.current?.querySelectorAll('.project-image-wrapper')[
      index
    ];
    if (img) {
      (img as any).timeline.resume();
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedProject(index);
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
          className="project-image-wrapper absolute w-1/3 h-1/3 flex flex-col items-start justify-center cursor-pointer"
          style={{
            left: `${(index % 3) * 33.33}%`,
            top: `${Math.floor(index / 3) * 33.33}%`,
          }}
          onMouseEnter={() => handleImageHover(index)}
          onMouseLeave={() => handleImageLeave(index)}
          onClick={() => handleImageClick(index)}
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
          <p className="text-amber-400 text-xl mt-2 text-left w-full px-2">
            {project.subtitle}
          </p>
        </div>
      ))}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: hoveredProject !== null ? 50 : 150 }}
      >
        <div className="bg-black bg-opacity-50 rounded-lg p-6">
          <h1
            className="text-white text-4xl md:text-6xl font-bold text-center px-4"
            style={{
              textShadow:
                '2px 2px 4px rgba(0,0,0,0.5), -2px -2px 4px rgba(0,0,0,0.5), 2px -2px 4px rgba(0,0,0,0.5), -2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {projectsPage.pageSubtitle}
          </h1>
        </div>
      </div>
      {selectedProject !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] transition-opacity duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-transparent text-white p-8 flex flex-col md:flex-row max-w-[95vw] w-full max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
              <Image
                src={urlFor(projectsPage.projects[selectedProject].photo).url()}
                alt={projectsPage.projects[selectedProject].subtitle}
                width={1200}
                height={900}
                objectFit="cover"
                className="rounded-md w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-4 overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4 text-amber-400">
                {projectsPage.projects[selectedProject].subtitle}
              </h2>
              <p className="text-2xl">
                {projectsPage.projects[selectedProject].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
