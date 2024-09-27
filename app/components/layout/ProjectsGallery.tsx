'use client';

import ProjectModal from '@/components/ui/ProjectModal';
import type { ProjectsPage as ProjectsPageType } from '@/types/projects';
import gsap from 'gsap';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const MIN_SCALE = 0.7;
const MAX_SCALE = 1.2;
const MOVEMENT_RANGE = 15;

interface ProjectsGalleryClientProps {
  projectsPage: ProjectsPageType;
  initialProjectId?: string;
}

export default function ProjectsGalleryClient({
  projectsPage,
  initialProjectId,
}: ProjectsGalleryClientProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const timelineRefs = useRef<(gsap.core.Timeline | null)[]>([]);

  const adjustOpacityOnOverlap = useCallback(
    (img: HTMLElement, images: NodeListOf<Element>) => {
      let isOverlapping = false;
      const imgRect = img.getBoundingClientRect();

      images.forEach((otherImg) => {
        if (otherImg === img) return;
        const otherRect = (otherImg as HTMLElement).getBoundingClientRect();

        if (
          imgRect.left < otherRect.right &&
          imgRect.right > otherRect.left &&
          imgRect.top < otherRect.bottom &&
          imgRect.bottom > otherRect.top
        ) {
          isOverlapping = true;
        }
      });

      img.style.opacity = isOverlapping ? '0.7' : '1';
    },
    []
  );

  const updateImageStyle = useCallback(
    (
      img: HTMLElement,
      index: number,
      totalImages: number,
      images: NodeListOf<Element>
    ) => {
      const scale = gsap.getProperty(img, 'scale') as number;
      const normalizedScale = (scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE);
      const blur = (1 - normalizedScale) * 2;

      const imageElement = img.querySelector('.project-image') as HTMLElement;
      if (imageElement) {
        imageElement.style.filter = `blur(${blur}px)`;
      }

      adjustOpacityOnOverlap(img, images);
    },
    [adjustOpacityOnOverlap]
  );

  useEffect(() => {
    if (!galleryRef.current) return;
    const container = galleryRef.current;
    const images = container.querySelectorAll('.project-image-wrapper');
    const totalImages = images.length;

    timelineRefs.current = new Array(totalImages).fill(null);

    images.forEach((imgElement, index) => {
      const img = imgElement as HTMLElement;
      const duration = gsap.utils.random(20, 30);
      const startX = gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE);
      const startY = gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE);
      const startScale = gsap.utils.random(MIN_SCALE, MAX_SCALE);

      const fixedZIndex = 10 + index;
      img.style.zIndex = `${fixedZIndex}`;

      gsap.set(img, {
        x: startX + '%',
        y: startY + '%',
        scale: startScale,
      });

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(img, {
        x: () => `${gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE)}%`,
        y: () => `${gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE)}%`,
        scale: () => gsap.utils.random(MIN_SCALE, MAX_SCALE),
        rotation: () => gsap.utils.random(-3, 3),
        duration: duration,
        ease: 'sine.inOut',
        onUpdate: () => updateImageStyle(img, index, totalImages, images),
      });

      timelineRefs.current[index] = tl;
    });

    return () => {
      timelineRefs.current.forEach((tl) => tl?.kill());
    };
  }, [updateImageStyle]);

  const handleImageHover = (index: number) => {
    setHoveredProject(index);
    const imgElement = galleryRef.current?.querySelectorAll(
      '.project-image-wrapper'
    )[index];
    const img = imgElement as HTMLElement;
    const timeline = timelineRefs.current[index];
    if (img && timeline) {
      timeline.pause();
      gsap.to(img, {
        scale: MAX_SCALE,
        duration: 0.3,
        x: 0,
        y: 0,
        rotation: 0,
        ease: 'power3.out',
      });
      const imageElement = img.querySelector('.project-image') as HTMLElement;
      if (imageElement) {
        imageElement.style.filter = 'blur(0px)';
      }
      img.style.opacity = '1';
      img.style.zIndex = '1000';
    }
  };

  const handleImageLeave = (index: number) => {
    setHoveredProject(null);
    const imgElement = galleryRef.current?.querySelectorAll(
      '.project-image-wrapper'
    )[index];
    const img = imgElement as HTMLElement;
    const timeline = timelineRefs.current[index];
    if (img && timeline) {
      timeline.resume();
      img.style.zIndex = `${10 + index}`;
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div
        ref={galleryRef}
        className="absolute inset-0"
        style={{ perspective: '1000px' }}
      >
        {projectsPage.projects.map((project, index) => (
          <ProjectModal
            key={project.projectId}
            project={project}
            index={index}
            isSmallScreen={isSmallScreen}
            onMouseEnter={() => handleImageHover(index)}
            onMouseLeave={() => handleImageLeave(index)}
            initialProjectId={initialProjectId}
            useQueryParams={true}
          />
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
      </div>
    </div>
  );
}
