import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Skeleton } from '@/components/ui/Skeleton';
import { urlFor } from '@/lib/sanity-client';
import type { Project } from '@/types/projects';
import { ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';

interface ProjectModalProps {
  project: Project;
  index: number;
  isSmallScreen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const LazyImage = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    fill
    sizes="(max-width: 640px) 100vw, 50vw"
    className="rounded-lg object-cover"
    loading="lazy"
  />
);

export default function ProjectModal({
  project,
  index,
  isSmallScreen,
  onMouseEnter,
  onMouseLeave,
}: ProjectModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="project-image-wrapper absolute w-1/3 h-1/3 flex flex-col items-start justify-center cursor-pointer"
          style={{
            left: `${(index % 3) * 33.33}%`,
            top: `${Math.floor(index / 3) * 33.33}%`,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="relative w-full h-full p-4">
            <div className="project-image absolute inset-0">
              <Image
                src={urlFor(project.photo).url()}
                alt={project.subtitle}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-xl object-cover"
              />
            </div>
          </div>
          <p className="text-amber-400 text-2xl mt-2 text-left w-full px-2">
            {project.subtitle}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-w-[90vw] sm:max-w-[80vw] h-[90vh] sm:h-[600px] p-0 overflow-hidden bg-black/60"
        hideCloseButton
      >
        <DialogTitle className="sr-only">{project.subtitle}</DialogTitle>
        <DialogDescription className="sr-only">
          Details about the project: {project.subtitle}
        </DialogDescription>
        <div className="flex flex-col sm:flex-row h-full rounded-lg overflow-hidden relative">
          <button
            onClick={() =>
              document.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Escape' })
              )
            }
            className="absolute right-2 top-2 z-10 rounded-sm bg-black/50 p-1 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <div className="w-full sm:w-1/2 h-1/3 sm:h-full p-6 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Suspense
                fallback={<Skeleton className="w-full h-full rounded-lg" />}
              >
                <LazyImage
                  src={urlFor(project.photo).url()}
                  alt={project.subtitle}
                />
              </Suspense>
            </div>
          </div>
          <div className="w-full sm:w-1/2 h-2/3 sm:h-full text-white p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-amber-400">
                {project.subtitle}
              </h2>
              {isSmallScreen && project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300"
                >
                  <ExternalLink className="h-6 w-6" />
                </Link>
              )}
            </div>
            <ScrollArea className="flex-grow pr-4 mb-4">
              <p className="text-lg sm:text-xl mb-6">{project.description}</p>
            </ScrollArea>
            {project.techStack && project.techStack.length > 0 && (
              <div className="mt-auto">
                <h3 className="text-xl font-semibold mb-2">
                  Technologies and Tools:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {!isSmallScreen && project.link && (
              <Button
                asChild
                className="mt-4 bg-amber-500 hover:bg-amber-600 text-white py-1 px-3 flex items-center space-x-2 self-start"
              >
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <span>Visit Project</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
