import { getProjectsPageData } from '@/api/sanity/projects/projects';
import { urlFor } from '@/lib/sanity-client';
import type { ProjectsPage as ProjectsPageType } from '@/types/projects';
import Image from 'next/image';

export const revalidate = 30; // Revalidate every 30 seconds

export default async function ProjectsPage() {
  try {
    console.log('Fetching projects page data...');
    const projectsPage: ProjectsPageType = await getProjectsPageData();
    console.log('Projects page data:', JSON.stringify(projectsPage, null, 2));

    if (!projectsPage) {
      console.error('No project page data available');
      return <div>No project page data available</div>;
    }

    return (
      <section className="px-4 sm:px-6 lg:px-8 bg-black text-white min-h-screen py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center text-amber-400">
            {projectsPage.pageTitle}
          </h1>
          <p className="text-xl mb-12 text-center">
            {projectsPage.pageSubtitle}
          </p>

          {projectsPage.projects.map((project, index) => (
            <div
              key={index}
              className="mb-12 flex flex-col md:flex-row items-center gap-8"
            >
              <div className="w-full md:w-1/2">
                <div className="relative w-full h-[300px]">
                  <Image
                    src={urlFor(project.photo).url()}
                    alt={project.subtitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">
                  {project.subtitle}
                </h2>
                <p className="mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error in ProjectsPage component:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return (
      <div>
        Error loading projects page. Please check the console for more details.
      </div>
    );
  }
}
