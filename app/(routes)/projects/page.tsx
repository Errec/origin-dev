import { getProjectsPageData } from '@/api/sanity/projects/projects';
import ProjectsGalleryClient from '@/components/layout/ProjectsGallery';
import type { ProjectsPage as ProjectsPageType } from '@/types/projects';
import { Suspense } from 'react';

export const revalidate = 30; // Revalidate every 30 seconds

export default async function ProjectsPage() {
  const projectsPage: ProjectsPageType = await getProjectsPageData();

  if (!projectsPage) {
    console.error('No project page data available');
    return <div>No project page data available</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsGalleryClient projectsPage={projectsPage} />
    </Suspense>
  );
}
