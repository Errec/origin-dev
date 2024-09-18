import { sanityClient } from '@/lib/sanity-client';
import { ProjectsPage } from '@/types/projects';

export async function getProjectsPageData(): Promise<ProjectsPage> {
  try {
    const query = `
      *[_type == 'projectsPage'][0] {
        pageTitle,
        pageSubtitle,
        projects[] {
          photo,
          subtitle,
          description,
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
