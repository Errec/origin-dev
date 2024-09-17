import { sanityClient } from '@/lib/sanity-client';
import { ProjectItem } from '@/types/project';

export async function getProjectItemData(): Promise<ProjectItem> {
  try {
    const query = `
      *[_type == 'projectsSection'][0] {
        sectionTitle,
        sectionSubtitle,
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
    console.error('Error fetching project item data:', error);
    throw error;
  }
}
