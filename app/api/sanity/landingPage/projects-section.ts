import { sanityClient } from '@/lib/sanity-client';

export async function getProjectsSectionData() {
  try {
    const query = `
      *[_type == "landingPage"][0] {
        projectsSection {
          title,
          subtitle,
          projects[] {
            title,
            subtitle,
            image {
              asset->
            },
            hoverVideo {
              asset->
            }
          }
        }
      }
    `;
    const result = await sanityClient.fetch(query);
    return result.projectsSection;
  } catch (error) {
    console.error('Error fetching projects section data:', error);
    throw error;
  }
}
