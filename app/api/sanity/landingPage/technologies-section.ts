import { sanityClient } from '@/lib/sanity-client';

export async function getTechnologiesSectionData() {
  try {
    const query = `
            *[_type == "landingPage"][0] {
                technologiesSection {
                    title,
                    technologies[] {
                        name,
                        logo {
                            asset-> {
                                url
                            }
                        }
                    }
                }
            }
        `;
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error('Error fetching technologies section data:', error);
    throw error;
  }
}
