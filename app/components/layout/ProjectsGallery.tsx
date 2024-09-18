'use client';
import { urlFor } from '@/lib/sanity-client';
import type { ProjectsPage as ProjectsPageType } from '@/types/projects';
import { ExternalLinkIcon } from '@radix-ui/react-icons'; // Importing Radix UI icon
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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
    [] // Dependencies of adjustOpacityOnOverlap
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
      const blur = (1 - normalizedScale) * 2; // 0 to 2px blur

      const imageElement = img.querySelector('.project-image') as HTMLElement;
      if (imageElement) {
        imageElement.style.filter = `blur(${blur}px)`;
      }

      // Check for overlap and adjust opacity
      adjustOpacityOnOverlap(img, images);

      // Optional: Keep the z-index fixed
    },
    [adjustOpacityOnOverlap] // Include adjustOpacityOnOverlap as a dependency
  );

  useEffect(() => {
    if (!galleryRef.current) return;
    const container = galleryRef.current;
    const images = container.querySelectorAll('.project-image-wrapper');
    const totalImages = images.length;

    images.forEach((imgElement, index) => {
      const img = imgElement as HTMLElement;
      const duration = gsap.utils.random(20, 30);
      const startX = gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE);
      const startY = gsap.utils.random(-MOVEMENT_RANGE, MOVEMENT_RANGE);
      const startScale = gsap.utils.random(MIN_SCALE, MAX_SCALE);

      // Set fixed z-index based on initial index
      const fixedZIndex = 10 + index;
      img.style.zIndex = `${fixedZIndex}`;

      // Set initial position and scale
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

      (img as any).timeline = tl;
    });

    return () => {
      images.forEach((imgElement) => {
        const img = imgElement as HTMLElement;
        if ((img as any).timeline) {
          (img as any).timeline.kill();
        }
      });
    };
  }, [updateImageStyle]);

  const handleImageHover = (index: number) => {
    setHoveredProject(index);
    const imgElement = galleryRef.current?.querySelectorAll(
      '.project-image-wrapper'
    )[index];
    const img = imgElement as HTMLElement;
    if (img) {
      (img as any).timeline.pause();
      gsap.to(img, {
        scale: MAX_SCALE,
        duration: 0.3,
        x: 0,
        y: 0,
        rotation: 0,
        ease: 'power3.out',
      });
      // Remove blur on hover
      const imageElement = img.querySelector('.project-image') as HTMLElement;
      if (imageElement) {
        imageElement.style.filter = 'blur(0px)';
      }
      // Make image fully opaque on hover
      img.style.opacity = '1';
      // Bring image to front
      img.style.zIndex = '1000';
    }
  };

  const handleImageLeave = (index: number) => {
    setHoveredProject(null);
    const imgElement = galleryRef.current?.querySelectorAll(
      '.project-image-wrapper'
    )[index];
    const img = imgElement as HTMLElement;
    if (img) {
      (img as any).timeline.resume();
      // Reset z-index
      img.style.zIndex = `${10 + index}`;
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedProject(index);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    // Close the modal if the click is on the backdrop
    if (e.target === e.currentTarget) {
      setSelectedProject(null);
    }
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
                className="rounded-xl object-cover" // Made borders rounder
              />
            </div>
          </div>
          <p className="text-amber-400 text-2xl mt-2 text-left w-full px-2">
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
          onClick={handleModalClick}
        >
          <div
            className="bg-black bg-opacity-60 text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row max-w-[90vw] w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0 flex justify-center items-center">
              <Image
                src={urlFor(projectsPage.projects[selectedProject].photo).url()}
                alt={projectsPage.projects[selectedProject].subtitle}
                width={800}
                height={600}
                className="rounded-xl w-full h-auto object-cover cursor-pointer"
                onClick={handleModalClick}
              />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-4 overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4 text-amber-400">
                {projectsPage.projects[selectedProject].subtitle}
              </h2>
              <p className="text-lg md:text-2xl mb-6">
                {projectsPage.projects[selectedProject].description}
              </p>
              {projectsPage.projects[selectedProject].link && (
                <Link
                  href={projectsPage.projects[selectedProject].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-1 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                >
                  <ExternalLinkIcon className="mr-2 h-5 w-5" />
                  Visit Project
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
