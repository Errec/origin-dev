import { sanityClient } from '@/lib/sanity-client';
import { ProjectPage } from '@/types/project';

export async function getProjectPageData(): Promise<ProjectPage> {
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
    console.error('Error fetching projects page data:', error);
    throw error;
  }
}
