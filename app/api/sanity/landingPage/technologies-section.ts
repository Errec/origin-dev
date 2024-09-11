import { sanityClient } from '@/lib/sanity-client';

export async function getTechnologiesSectionData() {
  try {
    const query = `
      *[_type == "landingPage"][0] {
        technologiesSection {
          title,
          subtitle,
          technologies[] {
            name,
            logo {
              asset->
            }
          }
        }
      }
    `;
    const result = await sanityClient.fetch(query);
    return result.technologiesSection;
  } catch (error) {
    console.error('Error fetching technologies section data:', error);
    throw error;
  }
}
