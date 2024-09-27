import { sanityClient } from '@/lib/sanity-client';
import { Project, ProjectsPage } from '@/types/projects';

export async function getProjectsPageData(): Promise<ProjectsPage> {
  try {
    const query = `
      *[_type == 'projectsPage'][0] {
        pageTitle,
        pageSubtitle,
        projects[] {
          projectId,
          photo,
          subtitle,
          description,
          techStack,
          link
        }
      }
    `;
    const response = await sanityClient.fetch(query);
    return response;
  } catch (error) {
    console.error('Error fetching project page data:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

export async function getProjectById(
  projectId: string
): Promise<Project | null> {
  try {
    const query = `
      *[_type == 'projectsPage'][0] {
        projects[projectId == $projectId][0] {
          projectId,
          photo,
          subtitle,
          description,
          techStack,
          link
        }
      }
    `;
    const response = await sanityClient.fetch(query, { projectId });
    return response.projects;
  } catch (error) {
    console.error('Error fetching project data:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}
