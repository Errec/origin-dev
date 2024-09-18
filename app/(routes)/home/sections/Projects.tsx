import MediaCard from '@/components/ui/MediaCard';
import { ProjectsSection } from '@/types/projects-section';
import React from 'react';

type ProjectsProps = {
  projectsSection: ProjectsSection;
};

export default function Projects({ projectsSection }: ProjectsProps) {
  if (!projectsSection) {
    console.error('Projects section data is missing');
    return null;
  }

  return (
    <section
      aria-labelledby="projects-title"
      className="px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="max-w-8xl mx-auto">
        <h2
          id="projects-title"
          className="text-[3.5vw] md:text-[2.5vw] lg:text-[1.5vw] text-center mb-4 text-amber-400 font-medium"
        >
          {projectsSection.title.toUpperCase()}
        </h2>
        <p className="text-[3.5vw] md:text-[2.5vw] lg:text-[1.5vw] mb-28 text-center">
          {projectsSection.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsSection.projects.map((project, index) => (
            <div key={index} className="w-full">
              <MediaCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
