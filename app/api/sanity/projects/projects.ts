import { sanityClient } from '@/lib/sanity-client';
import { ProjectsPage } from '@/types/projects';

export async function getProjectsPageData(): Promise<ProjectsPage> {
  try {
    console.log('Executing Sanity query for projects page...');
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
    console.log('Query:', query);
    const response = await sanityClient.fetch(query);
    console.log('Sanity response:', JSON.stringify(response, null, 2));
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
